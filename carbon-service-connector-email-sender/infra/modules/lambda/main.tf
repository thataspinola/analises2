
# -----------------------------------------------------------------
# LAMBDA FUNCTION
# -----------------------------------------------------------------

resource "aws_lambda_function" "carbon_lambda" {
  function_name    = var.project_name
  filename         = data.archive_file.carbon_lambda_file.output_path
  runtime          = "nodejs20.x"
  handler          = "index.handler"
  source_code_hash = data.archive_file.carbon_lambda_file.output_base64sha256
  role             = aws_iam_role.carbon_lambda_role.arn
  timeout          = var.lambda_timeout
  layers = [
    data.aws_lambda_layer_version.carbon_token_lambda_layer.arn,
    var.dynatrace_oneAgent_layer
  ]
  vpc_config {
    subnet_ids         = var.vpc_subnet_ids
    security_group_ids = var.vpc_security_group_id
  }
  environment {
    variables = {
      NODE_ENV                             = var.NODE_ENV
      S3_BUCKET                            = var.S3_BUCKET
      SENSEDIA_URL                         = var.SENSEDIA_URL
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

resource "aws_cloudwatch_log_group" "carbon_lambda_cloudwatch_log_group" {
  name              = "/aws/lambda/${aws_lambda_function.carbon_lambda.function_name}"
  retention_in_days = var.lambda_cloudwatch_log_retention
}

# -----------------------------------------------------------------
# LAMBDA ROLE & POLICIES
# -----------------------------------------------------------------

resource "aws_iam_role" "carbon_lambda_role" {
  name               = var.project_name
  assume_role_policy = data.aws_iam_policy_document.carbon_lambda_role_assume_policy_doc.json
}

resource "aws_iam_role_policy_attachment" "carbon_lambda_role_base_policy_attachment" {
  role       = aws_iam_role.carbon_lambda_role.name
  policy_arn = "arn:aws:iam::${var.account_id}:policy/carbon_lambda_base_execution_policy"
}

resource "aws_iam_role_policy_attachment" "carbon_lambda_role_basic_execution_policy_attachment" {
  role       = aws_iam_role.carbon_lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "carbon_lambda_role_vpc_policy_attachment" {
  role       = aws_iam_role.carbon_lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}

# -----------------------------------------------------------------
# LAMBDA EVENT SOURCE OR LAMBDA PERMISSION
# -----------------------------------------------------------------

resource "aws_lambda_event_source_mapping" "lambda_event_source" {
  event_source_arn         = var.email_sender_queue_arn
  enabled                 = true
  function_name           = aws_lambda_function.carbon_lambda.arn
  batch_size              = 10
  function_response_types = ["ReportBatchItemFailures"]
}

resource "aws_lambda_permission" "carbon_lambda_permission" {
  statement_id  = "AllowExecutionFromSQS"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.carbon_lambda.function_name
  principal     = "sqs.amazonaws.com"
  source_arn    = var.email_sender_queue_arn
}
