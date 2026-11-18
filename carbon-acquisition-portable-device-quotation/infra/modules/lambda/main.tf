# ----------------------------------------------------------------
# LAMBDA FUNCTION
# ----------------------------------------------------------------

resource "aws_lambda_function" "lambda" {
  function_name    = var.project_name
  filename         = data.archive_file.lambda_file.output_path
  runtime          = "nodejs20.x"
  handler          = "index.handler"
  source_code_hash = data.archive_file.lambda_file.output_base64sha256
  role             = aws_iam_role.lambda_role.arn
  layers = [
    data.aws_lambda_layer_version.carbon_token_layer.arn,
    var.dynatrace_oneAgent_layer
  ]
  timeout = var.timeout
  vpc_config {
    subnet_ids         = var.vpc_subnet_ids
    security_group_ids = var.vpc_security_group_id
  }
  environment {
    variables = {
      NODE_ENV                                      = var.NODE_ENV
      COUPON_API_URL                                = var.COUPON_API_URL
      MULESOFT_URL                                  = var.MULESOFT_URL
      MAX_TIME_PROCESS_QUOTATION                    = var.MAX_TIME_PROCESS_QUOTATION
      WAITING_TIME_TO_GET_QUOTATION_IN_MILLISECONDS = var.WAITING_TIME_TO_GET_QUOTATION_IN_MILLISECONDS
      AWS_LAMBDA_EXEC_WRAPPER                       = var.DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER
      DT_TENANT                                     = var.DYNATRACE_DT_TENANT
      DT_CLUSTER_ID                                 = var.DYNATRACE_DT_CLUSTER_ID
      DT_CONNECTION_BASE_URL                        = var.DYNATRACE_DT_CONNECTION_BASE_URL
      DT_CONNECTION_AUTH_TOKEN                      = var.DYNATRACE_DT_CONNECTION_AUTH_TOKEN
      DT_LOG_COLLECTION_AUTH_TOKEN                  = var.DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN
      DT_OPEN_TELEMETRY_ENABLE_INTEGRATION          = var.DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION
      HUB_VENDAS_CARBON_SUPPORT_CREATE_LEAD_API     = var.HUB_VENDAS_CARBON_SUPPORT_CREATE_LEAD_API
      COVERAGE_PLAN_CODES                           = var.COVERAGE_PLAN_CODES
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
  name               = var.project_name
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

resource "aws_iam_role_policy" "dynamo_access" {
  name   = "${var.project_name}-lambda-dynamo-role"
  policy = data.aws_iam_policy_document.lambda_iam_dynamodb_role_document.json
  role   = aws_iam_role.lambda_role.id
}

# ----------------------------------------------------------------
# LAMBDA CLOUDWATCH
# ----------------------------------------------------------------

resource "aws_cloudwatch_log_group" "lambda_cloudwatch" {
  name              = "/aws/lambda/${aws_lambda_function.lambda.function_name}"
  retention_in_days = var.cloudwatch_log_retention
}


# -----------------------------------------------------------------
# LAMBDA EVENT SOURCE OR LAMBDA PERMISSION
# -----------------------------------------------------------------

resource "aws_lambda_permission" "lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_gateway_execution_arn}/${var.api_gateway_stage_name}/${var.api_gateway_http_method}/"
}
