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
  memory_size      = var.lambda_memory_size
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
      NODE_ENV                                        = var.NODE_ENV
      SENSEDIA_URL                                    = var.SENSEDIA_URL
      SENSEDIACLOUD_URL                               = var.SENSEDIACLOUD_URL
      UPDATE_LEAD_AUTO_QUEUE_URL                      = var.UPDATE_LEAD_AUTO_QUEUE_URL
      DENY_LEAD_AUTO_QUEUE_URL                        = var.DENY_LEAD_AUTO_QUEUE_URL
      AWS_LAMBDA_EXEC_WRAPPER                         = var.DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER
      DT_TENANT                                       = var.DYNATRACE_DT_TENANT
      DT_CLUSTER_ID                                   = var.DYNATRACE_DT_CLUSTER_ID
      DT_CONNECTION_BASE_URL                          = var.DYNATRACE_DT_CONNECTION_BASE_URL
      DT_CONNECTION_AUTH_TOKEN                        = var.DYNATRACE_DT_CONNECTION_AUTH_TOKEN
      DT_LOG_COLLECTION_AUTH_TOKEN                    = var.DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN
      DT_OPEN_TELEMETRY_ENABLE_INTEGRATION            = var.DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION
      HUB_VENDAS_CARBON_ACQUISITION_SHOPPING_CART_API = var.HUB_VENDAS_CARBON_ACQUISITION_SHOPPING_CART_API
      EIGHTY_PERCENT_DISCOUNT_STRING_LIST_CODES       = var.EIGHTY_PERCENT_DISCOUNT_STRING_LIST_CODES
      EIGHTY_FIVE_PERCENT_DISCOUNT_STRING_LIST_CODES  = var.EIGHTY_FIVE_PERCENT_DISCOUNT_STRING_LIST_CODES
      NINETY_PERCENT_DISCOUNT_STRING_LIST_CODES       = var.NINETY_PERCENT_DISCOUNT_STRING_LIST_CODES
    }
  }
  depends_on = [
    aws_iam_role.lambda_role
  ]
}

# ---------------------------------------------------------------
# LAMBDA ROLE
# ---------------------------------------------------------------

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
  retention_in_days = var.cloudwatch_log_retention
}
