# ----------------------------------------------------------------
# LAMBDA FUNCTION
# ----------------------------------------------------------------

resource "aws_lambda_function" "lambda" {
  function_name    = var.project_name
  filename         = data.archive_file.lambda_file.output_path
  runtime          = "nodejs22.x"
  handler          = local.lambda_handler
  source_code_hash = data.archive_file.lambda_file.output_base64sha256
  role             = aws_iam_role.lambda_role.arn
  timeout          = var.lambda_timeout
  memory_size      = var.max_memory_size
  vpc_config {
    subnet_ids         = local.vpc_subnet_ids
    security_group_ids = local.vpc_security_groups_ids
  }
  layers = concat([
    #include here dynatrace/twistlock NOT RELATED layers
  ], local.dynatrace_lambda_layers, local.twistlock_lambda_layers)
  environment {
    variables = merge({
      NODE_ENV                             = var.NODE_ENV
      INTERNAL_GTW_EMAIL_NOTIFICATION_URL  = var.INTERNAL_GTW_EMAIL_NOTIFICATION_URL
      INSPECTION_PORTABLE_DEVICE_DLQ       = var.INSPECTION_PORTABLE_DEVICE_DLQ
      AWS_LAMBDA_EXEC_WRAPPER              = var.DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER
      DT_TENANT                            = var.DYNATRACE_DT_TENANT
      DT_CLUSTER_ID                        = var.DYNATRACE_DT_CLUSTER_ID
      DT_CONNECTION_BASE_URL               = var.DYNATRACE_DT_CONNECTION_BASE_URL
      DT_CONNECTION_AUTH_TOKEN             = var.DYNATRACE_DT_CONNECTION_AUTH_TOKEN
      DT_LOG_COLLECTION_AUTH_TOKEN         = var.DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN
      DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION
    }, local.dynatrace_lambda_variables, local.twistlock_lambda_variables)
  }
}

# ---------------------------------------------------------------
# LAMBDA ROLE
# ---------------------------------------------------------------

resource "aws_iam_role" "lambda_role" {
  name               = var.project_name
  assume_role_policy = data.aws_iam_policy_document.lambda_role_policy_doc.json
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

resource "aws_iam_role_policy_attachment" "AmazonSSMReadOnlyAccess" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMReadOnlyAccess"
}

# ----------------------------------------------------------------
# LAMBDA CLOUDWATCH
# ----------------------------------------------------------------

resource "aws_cloudwatch_log_group" "lambda_cloudwatch" {
  name              = "/aws/lambda/${aws_lambda_function.lambda.function_name}"
  retention_in_days = var.cloudwatch_log_retention
}
