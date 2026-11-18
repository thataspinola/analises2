# -----------------------------------------------------------------
# LAMBDA ARCHIVES
# -----------------------------------------------------------------

data "archive_file" "lambda_file" {
  type        = "zip"
  source_dir  = "${path.root}/../app-request/"
  output_path = "${path.root}/../app-request.zip"
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

resource "aws_lambda_function" "lambda" {
  function_name    = "${var.prefix_project_name}-request"
  filename         = data.archive_file.lambda_file.output_path
  runtime          = "nodejs20.x"
  handler          = "index.handler"
  source_code_hash = data.archive_file.lambda_file.output_base64sha256
  role             = aws_iam_role.lambda_role.arn
  memory_size      = var.lambda_memory_size
  layers = [
    data.aws_lambda_layer_version.common_layer.arn,
    var.dynatrace_oneAgent_layer
  ]
  timeout = var.lambda_timeout
  vpc_config {
    subnet_ids         = var.vpc_subnet_ids
    security_group_ids = var.vpc_security_group_id
  }
  environment {
    variables = {
      NODE_ENV                             = var.NODE_ENV
      DIRECT_CONTACT_REQUESTS_QUEUE        = var.contact_requests_queue_url
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

# ----------------------------------------------------------------
# LAMBDA LAYERS
# ----------------------------------------------------------------
data "aws_lambda_layer_version" "common_layer" {
  layer_name = var.common_layer_name
}

# -----------------------------------------------------------------
# LAMBDA CLOUDWATCH
# -----------------------------------------------------------------
resource "aws_cloudwatch_log_group" "lambda_cloudwatch_log_group" {
  name              = "/aws/lambda/${aws_lambda_function.lambda.function_name}"
  retention_in_days = var.lambda_cloudwatch_log_retention
}

# -----------------------------------------------------------------
# LAMBDA ROLE & POLICIES
# -----------------------------------------------------------------
data "aws_iam_policy_document" "lambda_role_assume_policy_doc" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda_role" {
  name               = "carbon-pre-financing-pool-direct-contact-request-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_role_assume_policy_doc.json
}

resource "aws_iam_role_policy_attachment" "lambda_role_base_policy_attachment" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::${var.account_id}:policy/carbon_lambda_base_execution_policy"
}

resource "aws_iam_role_policy_attachment" "lambda_role_basic_execution_policy_attachment" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "lambda_role_vpc_policy_attachment" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}

# -----------------------------------------------------------------
# LAMBDA EVENT SOURCE OR LAMBDA PERMISSION
# -----------------------------------------------------------------

resource "aws_lambda_permission" "lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_gateway_execution_arn}/${var.api_gateway_stage_name}/${var.api_gateway_http_method}/${var.api_gateway_path_part}"
}
