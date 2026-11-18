# -----------------------------------------------------------------
# LAMBDA ARCHIVES
# -----------------------------------------------------------------

data "archive_file" "lambda_file" {
  type        = "zip"
  source_dir  = "${path.root}/../app-otp-check/"
  output_path = "${path.root}/../app-otp-check.zip"
  excludes = setunion(
    fileset("${path.root}/../app-otp-check/", "__test__/**/*.*"),
    fileset("${path.root}/../app-otp-check/", "coverage/**/*.*"),
    fileset("${path.root}/../app-otp-check/", ".scannerwork/**/*.*"),
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
  function_name    = "carbon-otp-check"
  filename         = data.archive_file.lambda_file.output_path
  runtime          = "nodejs20.x"
  handler          = "index.handler"
  source_code_hash = data.archive_file.lambda_file.output_base64sha256
  role             = aws_iam_role.lambda_role.arn
  layers = [
    data.aws_lambda_layer_version.carbon_token_layer.arn,
    var.dynatrace_oneAgent_layer
  ]
  timeout = var.lambda_timeout
  vpc_config {
    subnet_ids         = var.vpc_subnet_ids
    security_group_ids = var.vpc_security_group_id
  }
  environment {
    variables = {
      NODE_ENV                                                 = var.NODE_ENV
      SENSEDIA_CLOUD_URL                                       = var.SENSEDIA_CLOUD_URL
      SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_API_PATH    = var.SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_API_PATH
      SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_ORGNAME     = var.SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_ORGNAME
      SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_PROFILENAME = var.SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_PROFILENAME
      OTP_REDIS_CACHE_CONN_STRING                              = var.OTP_REDIS_CACHE_CONN_STRING
      MULESOFT_URL                                             = var.MULESOFT_URL
      BCP_API_PATH                                             = var.BCP_API_PATH
      GOVERNANCA_DADOS_PESSOA_API_PATH                         = var.GOVERNANCA_DADOS_PESSOA_API_PATH
      AWS_LAMBDA_EXEC_WRAPPER                                  = var.DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER
      DT_TENANT                                                = var.DYNATRACE_DT_TENANT
      DT_CLUSTER_ID                                            = var.DYNATRACE_DT_CLUSTER_ID
      DT_CONNECTION_BASE_URL                                   = var.DYNATRACE_DT_CONNECTION_BASE_URL
      DT_CONNECTION_AUTH_TOKEN                                 = var.DYNATRACE_DT_CONNECTION_AUTH_TOKEN
      DT_LOG_COLLECTION_AUTH_TOKEN                             = var.DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN
      DT_OPEN_TELEMETRY_ENABLE_INTEGRATION                     = var.DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION
    }
  }
}

# ----------------------------------------------------------------
# LAMBDA LAYERS
# ----------------------------------------------------------------

data "aws_lambda_layer_version" "carbon_token_layer" {
  layer_name = var.token_layer_name
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
  name               = "carbon-otp-check-role"
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
