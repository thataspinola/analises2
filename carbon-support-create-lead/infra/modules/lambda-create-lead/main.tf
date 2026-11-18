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
    data.aws_lambda_layer_version.dynamics_lambda_layer.arn,
    var.dynatrace_oneAgent_layer
  ]
  timeout     = var.lambda_timeout
  memory_size = var.max_memory_size

  vpc_config {
    subnet_ids         = var.vpc_subnet_ids
    security_group_ids = var.vpc_security_group_id
  }
  environment {
    variables = {
      NODE_ENV                             = var.NODE_ENV
      LEAD_ORIGEM_HUB_SIMULADOR            = var.LEAD_ORIGEM_HUB_SIMULADOR
      CLIENT_REGISTER_UPDATE_SNS_TOPIC_ARN = var.client_register_update_sns_topic_arn
      REGISTER_COMPLETE_GATEWAY_URL        = var.REGISTER_COMPLETE_GATEWAY_URL
      CREATE_LEAD_WITHOUT_BCC              = var.CREATE_LEAD_WITHOUT_BCC
      LEAD_IN_PROGRESS_TTL_IN_MINUTES      = var.LEAD_IN_PROGRESS_TTL_IN_MINUTES
      MULESOFT_URL                         = var.MULESOFT_URL
      GOVERNANCA_DADOS_PESSOA_API_PATH     = var.GOVERNANCA_DADOS_PESSOA_API_PATH
      DEFAULT_SUSEP                        = var.DEFAULT_SUSEP
      OPORTUNIDADE_ID                      = var.OPORTUNIDADE_ID
      AWS_LAMBDA_EXEC_WRAPPER              = var.DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER
      DT_TENANT                            = var.DYNATRACE_DT_TENANT
      DT_CLUSTER_ID                        = var.DYNATRACE_DT_CLUSTER_ID
      DT_CONNECTION_BASE_URL               = var.DYNATRACE_DT_CONNECTION_BASE_URL
      DT_CONNECTION_AUTH_TOKEN             = var.DYNATRACE_DT_CONNECTION_AUTH_TOKEN
      DT_LOG_COLLECTION_AUTH_TOKEN         = var.DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN
      DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION
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


# ----------------------------------------------------------------
# LAMBDA CLOUDWATCH
# ----------------------------------------------------------------

resource "aws_cloudwatch_log_group" "lambda_cloudwatch" {
  name              = "/aws/lambda/${aws_lambda_function.lambda.function_name}"
  retention_in_days = var.cloudwatch_log_retention
}
