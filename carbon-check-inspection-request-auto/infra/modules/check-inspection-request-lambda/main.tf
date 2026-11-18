# ----------------------------------------------------------------
# LAMBDA ARCHIVES
# ----------------------------------------------------------------

data "archive_file" "lambda_file" {
  type        = "zip"
  source_dir  = "${path.root}/../app-check-inspection-request/"
  output_path = "${path.root}/../app-check-inspection-request.zip"
  excludes = setunion(
    fileset("${path.root}/../app-check-inspection-request/", "__test__/**/*.*"),
    fileset("${path.root}/../app-check-inspection-request/", "coverage/**/*.*"),
    fileset("${path.root}/../app-check-inspection-request/", ".scannerwork/**/*.*"),
    [
      "jest.config.js",
      "localRunner.js"
    ]
  )
}

# ----------------------------------------------------------------
# LAMBDA FUNCTION
# ----------------------------------------------------------------

resource "aws_lambda_function" "lambda" {
  function_name    = var.function_name
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
      SENSEDIA_URL                                             = var.SENSEDIA_URL
      SENSEDIACLOUD_URL                                        = var.SENSEDIACLOUD_URL
      SENSEDIA_API_TIMEOUT                                     = var.SENSEDIA_API_TIMEOUT
      PAYMENT_REGISTER_ENDPOINT_URL                            = var.PAYMENT_REGISTER_ENDPOINT_URL
      AUTOMOVEL_PARCEIRO_MARKETPLACE_OFERTAS_COTACOES_API_PATH = var.AUTOMOVEL_PARCEIRO_MARKETPLACE_OFERTAS_COTACOES_API_PATH
      AUTO_INSURANCE_PAYMENT_READY_SET_OF_FEEDBACKS_TEXT_SSV   = var.AUTO_INSURANCE_PAYMENT_READY_SET_OF_FEEDBACKS_TEXT_SSV
      AWS_LAMBDA_EXEC_WRAPPER                                  = var.DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER
      DT_TENANT                                                = var.DYNATRACE_DT_TENANT
      DT_CLUSTER_ID                                            = var.DYNATRACE_DT_CLUSTER_ID
      DT_CONNECTION_BASE_URL                                   = var.DYNATRACE_DT_CONNECTION_BASE_URL
      DT_CONNECTION_AUTH_TOKEN                                 = var.DYNATRACE_DT_CONNECTION_AUTH_TOKEN
      DT_LOG_COLLECTION_AUTH_TOKEN                             = var.DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN
      DT_OPEN_TELEMETRY_ENABLE_INTEGRATION                     = var.DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION
      UP_TO_FIFTEEN_MINUTES                                    = var.UP_TO_FIFTEEN_MINUTES
      UP_TO_TWENTY_FOUR_HOURS                                  = var.UP_TO_TWENTY_FOUR_HOURS
      MAX_LIMIT                                                = var.MAX_LIMIT
      UP_TO_FIFTEEN_MINUTES_TTL                                = var.UP_TO_FIFTEEN_MINUTES_TTL
      UP_TO_TWENTY_FOUR_HOURS_TTL                              = var.UP_TO_TWENTY_FOUR_HOURS_TTL
      MAX_LIMIT_TTL                                            = var.MAX_LIMIT_TTL
      INSPECTION_REQUEST_AUTO_DLQ_URL                          = var.INSPECTION_REQUEST_AUTO_DLQ_URL
    }
  }
  depends_on = [
    aws_iam_role.lambda_role
  ]
}

# ----------------------------------------------------------------
# LAMBDA LAYERS
# ----------------------------------------------------------------

data "aws_lambda_layer_version" "carbon_token_layer" {
  layer_name = var.token_layer_name
}

# ---------------------------------------------------------------
# LAMBDA ROLE
# ---------------------------------------------------------------

data "aws_iam_policy_document" "lambda_assume_policy_doc" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda_role" {
  name               = "${var.function_name}-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_policy_doc.json
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

# ----------------------------------------------------------------
# LAMBDA CLOUDWATCH
# ----------------------------------------------------------------

resource "aws_cloudwatch_log_group" "lambda_cloudwatch" {
  name              = "/aws/lambda/${aws_lambda_function.lambda.function_name}"
  retention_in_days = var.lambda_cloudwatch_log_retention
}
