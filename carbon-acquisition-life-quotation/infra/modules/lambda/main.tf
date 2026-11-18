# -----------------------------------------------------------------
# LAMBDA ARCHIVES
# -----------------------------------------------------------------

data "archive_file" "lambda_quotation_file" {
  type = "zip"
  source_dir  = "${path.root}/../app/"
  output_path = "${path.root}/../life-quotation-lambda-app.zip"
  excludes    = setunion(
    fileset("${path.root}/../app/", "__test__/**/."),
    fileset("${path.root}/../app/", "coverage/**/."),
    [
      "jest.config.js",
      "localRunner.js"
    ]
  )
}

data "aws_lambda_layer_version" "token_lambda_layer" {
  layer_name = var.token_lambda_layer_name
}

# -----------------------------------------------------------------
# LAMBDA FUNCTION
# -----------------------------------------------------------------

resource "aws_lambda_function" "lambda_quotation" {
  function_name = var.project_name
  filename = data.archive_file.lambda_quotation_file.output_path
  runtime = "nodejs18.x"
  handler = "index.handler"
  source_code_hash = data.archive_file.lambda_quotation_file.output_base64sha256
  layers = [
    data.aws_lambda_layer_version.token_lambda_layer.arn,
    var.dynatrace_oneAgent_layer
  ]
  role = aws_iam_role.lambda_role.arn
  timeout = var.lambda_timeout
  vpc_config {
    subnet_ids         = var.vpc_subnet_ids
    security_group_ids = var.vpc_security_group_id
  }
  environment {
    variables = {
      NODE_ENV = var.NODE_ENV
      SENSEDIA_URL = var.SENSEDIA_URL
      OFERTAS_PATH = var.OFERTAS_PATH
      AWS_LAMBDA_EXEC_WRAPPER              = var.DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER
      DT_TENANT                            = var.DYNATRACE_DT_TENANT
      DT_CLUSTER_ID                        = var.DYNATRACE_DT_CLUSTER_ID
      DT_CONNECTION_BASE_URL               = var.DYNATRACE_DT_CONNECTION_BASE_URL
      DT_CONNECTION_AUTH_TOKEN             = var.DYNATRACE_DT_CONNECTION_AUTH_TOKEN
      DT_LOG_COLLECTION_AUTH_TOKEN         = var.DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN
      DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION
    }
  }
}

# -----------------------------------------------------------------
# LAMBDA CLOUDWATCH
# -----------------------------------------------------------------

resource "aws_cloudwatch_log_group" "lambda_quotation_cloudwatch" {
  name = "/aws/lambda/${aws_lambda_function.lambda_quotation.function_name}"
  retention_in_days = var.lambda_cloudwatch_log_retention
}

# -----------------------------------------------------------------
# LAMBDA ROLE & POLICIES
# -----------------------------------------------------------------

data "aws_iam_policy_document" "lambda_role_policy_doc" {
    version = "2012-10-17"
    statement {
        actions = ["sts:AssumeRole"]
        effect = "Allow"
        sid    = ""
        principals {
          type        = "Service"
          identifiers = ["lambda.amazonaws.com"]
        }
    }
}

resource "aws_iam_role" "lambda_role" {
  name               = var.project_name
  assume_role_policy = data.aws_iam_policy_document.lambda_role_policy_doc.json
}

resource "aws_iam_role_policy_attachment" "policy_attachment_carbon_lambda_base_execution_policy" {
  role = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::${var.account_id}:policy/carbon_lambda_base_execution_policy"
}

resource "aws_iam_role_policy_attachment" "policy_attachment_AWSLambdaBasicExecutionRole" {
  role = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "policy_attachment_AWSLambdaVPCAccessExecutionRole" {
    role       = aws_iam_role.lambda_role.name
    policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}