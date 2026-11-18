# -----------------------------------------------------------------
# LAMBDA ARCHIVES
# -----------------------------------------------------------------

data "archive_file" "carbon_acquisition_transmission_lambda_file" {
  type = "zip"
  source_dir  = "${path.root}/../app/"
  output_path = "${path.root}/../carbon-acq-transmission-lambda-app.zip"
  excludes = setunion(
    fileset("${path.root}/../app/", "__test__/**/*.*"),
    fileset("${path.root}/../app/", "coverage/**/*.*"),
    [
      "jest.config.js",
      "localRunner.js"
    ]
  )
}


# -----------------------------------------------------------------
# LAMBDA FUNCTION
# -----------------------------------------------------------------

resource "aws_lambda_function" "carbon_acquisition_transmission_lambda" {
  function_name = "carbon-acq-transmission"
  filename = data.archive_file.carbon_acquisition_transmission_lambda_file.output_path
  runtime = "nodejs18.x"
  handler = "index.handler"
  source_code_hash = data.archive_file.carbon_acquisition_transmission_lambda_file.output_base64sha256
  role = aws_iam_role.carbon_acquisition_transmission_lambda_role.arn
  timeout = var.lambda_timeout
  vpc_config {
    subnet_ids = var.vpc_subnet_ids
    security_group_ids = var.vpc_security_group_id
  }
  environment {
    variables = {
      NODE_ENV = var.NODE_ENV
      TRAVEL_QUEUE = var.TRAVEL_QUEUE
      RESIDENTIAL_QUEUE = var.RESIDENTIAL_QUEUE
    }
  }
}

# -----------------------------------------------------------------
# LAMBDA CLOUDWATCH
# -----------------------------------------------------------------

resource "aws_cloudwatch_log_group" "carbon_acquisition_transmission_lambda_cloudwatch_log_group" {
  name = "/aws/lambda/${aws_lambda_function.carbon_acquisition_transmission_lambda.function_name}"
  retention_in_days = var.lambda_cloudwatch_log_retention
}

# -----------------------------------------------------------------
# LAMBDA ROLE & POLICIES
# -----------------------------------------------------------------

data "aws_iam_policy_document" "carbon_acquisition_transmission_lambda_role_assume_policy_doc" {
  statement {
    actions = [ "sts:AssumeRole" ]
    principals {
      type = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "carbon_acquisition_transmission_lambda_role" {
  name = "carbon-acquisition-transmission-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.carbon_acquisition_transmission_lambda_role_assume_policy_doc.json
}

resource "aws_iam_role_policy_attachment" "carbon_acquisition_transmission_lambda_role_base_policy_attachment" {
  role = aws_iam_role.carbon_acquisition_transmission_lambda_role.name
  policy_arn = "arn:aws:iam::${var.account_id}:policy/carbon_lambda_base_execution_policy"
}

resource "aws_iam_role_policy_attachment" "carbon_acquisition_transmission_lambda_role_basic_execution_policy_attachment" {
  role = aws_iam_role.carbon_acquisition_transmission_lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "carbon_acquisition_transmission_lambda_role_vpc_policy_attachment" {
  role = aws_iam_role.carbon_acquisition_transmission_lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}

resource "aws_iam_policy" "iam_role_policy_lambda_checkout_processor" {
  name = "policy-lambda-acq-transmission-travel-residential"
  policy =  <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "SQSStatementTravel",
            "Effect": "Allow",
            "Action": [
              "sqs:SendMessage"
            ],
            "Resource": "arn:aws:sqs:ca-central-1:${var.account_id}:carbon-acq-travel-transmission"
        },
        {
            "Sid": "SQSStatementResidential",
            "Effect": "Allow",
            "Action": [
              "sqs:SendMessage"
            ],
            "Resource": "arn:aws:sqs:ca-central-1:${var.account_id}:carbon-acq-residential-transmission"
        }
    ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "attachment_secret_policy_lambda_client_checkout_processor" {
  role = aws_iam_role.carbon_acquisition_transmission_lambda_role.name
  policy_arn = aws_iam_policy.iam_role_policy_lambda_checkout_processor.arn
}


# -----------------------------------------------------------------
# LAMBDA EVENT SOURCE OR LAMBDA PERMISSION
# -----------------------------------------------------------------

resource "aws_lambda_permission" "carbon_acquisition_transmission_lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.carbon_acquisition_transmission_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn = "${var.carbon_acquisition_transmission_gateway_rest_api_deployment_execution_arn}${var.gateway_stage_name}/${var.gateway_http_method}/${var.gateway_path_part}"
}
