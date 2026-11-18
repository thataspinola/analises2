# ----------------------------------------------------------------
# LAMBDA FUNCTION
# ----------------------------------------------------------------

resource "aws_lambda_function" "lambda" {
  function_name    = var.function_name
  filename         = data.archive_file.lambda_file.output_path
  runtime          = "nodejs22.x"
  handler          = "index.handler"
  source_code_hash = data.archive_file.lambda_file.output_base64sha256
  role             = aws_iam_role.lambda_role.arn
  layers = [
    data.aws_lambda_layer_version.carbon_token_layer.arn,
    data.aws_lambda_layer_version.common_layer.arn,
    data.aws_lambda_layer_version.postponed_payment_data_layer.arn,
    data.aws_lambda_layer_version.service_order_layer.arn,
    var.dynatrace_oneAgent_layer_arn
  ]
  timeout     = var.timeout
  memory_size = var.max_memory_size
  vpc_config {
    subnet_ids         = var.vpc_subnet_ids
    security_group_ids = var.vpc_security_group_id
  }
  environment {
    variables = {
      NODE_ENV                                                = var.NODE_ENV
      API_PATH                                                = var.API_PATH
      SENSEDIA_URL                                            = var.SENSEDIA_URL
      SENSEDIA_CLOUD_URL                                      = var.SENSEDIA_CLOUD_URL
      AWS_LAMBDA_EXEC_WRAPPER                                 = var.DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER
      DT_TENANT                                               = var.DYNATRACE_DT_TENANT
      DT_CLUSTER_ID                                           = var.DYNATRACE_DT_CLUSTER_ID
      DT_CONNECTION_BASE_URL                                  = var.DYNATRACE_DT_CONNECTION_BASE_URL
      DT_CONNECTION_AUTH_TOKEN                                = var.DYNATRACE_DT_CONNECTION_AUTH_TOKEN
      DT_LOG_COLLECTION_AUTH_TOKEN                            = var.DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN
      DT_OPEN_TELEMETRY_ENABLE_INTEGRATION                    = var.DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION
      SENDGRID_API_URL                                        = var.SENDGRID_API_URL
      SENDGRID_API_ENDPOINT_PATH                              = var.SENDGRID_API_ENDPOINT_PATH
      FAILED_REQUEST_TABLE_NAME                               = var.FAILED_REQUEST_TABLE_NAME
      SENDGRID_API_ENDPOINT_PATH                              = var.SENDGRID_API_ENDPOINT_PATH
      PORTOSERVICO_SENDGRID_AUTH_TOKEN                        = var.PORTOSERVICO_SENDGRID_AUTH_TOKEN
      PORTOSERVICO_SERVICEORDER_MAIL_SENDER                   = var.PORTOSERVICO_SERVICEORDER_MAIL_SENDER
      PORTOSERVICO_SERVICEORDER_MAIL_SENDER_NAME              = var.PORTOSERVICO_SERVICEORDER_MAIL_SENDER_NAME
      PORTOSERVICO_SERVICEORDER_MAIL_FAILED_SUBJECT           = var.PORTOSERVICO_SERVICEORDER_MAIL_FAILED_SUBJECT
      PORTOSERVICO_SERVICEORDER_MAIL_FAILED_TEMPLATEID        = var.PORTOSERVICO_SERVICEORDER_MAIL_FAILED_TEMPLATEID
      CARBON_SERVICE_ORDER_PAYMENT_CHECKOUT_API_URL           = var.CARBON_SERVICE_ORDER_PAYMENT_CHECKOUT_API_URL
      CARBON_SERVICE_ORDER_PAYMENT_CHECKOUT_API_ENDPOINT_PATH = var.CARBON_SERVICE_ORDER_PAYMENT_CHECKOUT_API_ENDPOINT_PATH
    }
  }
}

# -----------------------------------------------------------------
# LAMBDA ROLE & POLICIES
# -----------------------------------------------------------------

resource "aws_iam_role" "lambda_role" {
  name               = "${var.function_name}-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_role_policy_doc.json
  tags = {
    sqs-carbon-acquisition-sp-service-order-request-producer = "true"
  }
}

resource "aws_iam_role_policy_attachment" "carbon_lambda_base_execution" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::${var.account_id}:policy/carbon_lambda_base_execution_policy"
}

resource "aws_iam_role_policy_attachment" "AWSLambdaBasicExecutionRole" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "AWSLambdaVPCAccessExecutionRole" {
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
