# ----------------------------------------------------------------
# LAMBDA ARCHIVES
# ----------------------------------------------------------------

data "archive_file" "lambda_file" {
  type        = "zip"
  source_dir  = "${path.root}/../app-process/"
  output_path = "${path.root}/../app-process.zip"
  excludes = setunion(
    fileset("${path.root}/../app/", "__test__/**/*.*"),
    fileset("${path.root}/../app/", "coverage/**/*.*"),
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
  function_name    = "${var.prefix_project_name}-process"
  filename         = data.archive_file.lambda_file.output_path
  runtime          = "nodejs20.x"
  handler          = "index.handler"
  source_code_hash = data.archive_file.lambda_file.output_base64sha256
  role             = aws_iam_role.lambda_role.arn
  layers = [
    data.aws_lambda_layer_version.carbon_token_layer.arn,
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
      NODE_ENV                                               = var.NODE_ENV
      MULESOFT_URL                                           = var.MULESOFT_URL
      SENSEDIA_URL                                           = var.SENSEDIA_URL
      SENSEDIA_CLOUD_URL_INTERNAL                            = var.SENSEDIA_CLOUD_URL_INTERNAL
      PRODUCAO_COMERCIAL_GDL_LEADS_MULTICANAL_PERMALINK      = var.PRODUCAO_COMERCIAL_GDL_LEADS_MULTICANAL_PERMALINK
      CREAT_LEAD_PATH                                        = var.CREAT_LEAD_PATH
      UPDATE_CONTACT_REQUEST_PATH                            = var.UPDATE_CONTACT_REQUEST_PATH
      GOVERNANCA_DADOS_PESSOA_API_PATH                       = var.GOVERNANCA_DADOS_PESSOA_API_PATH
      AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOS_API_PATH   = var.AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOS_API_PATH
      PRE_FINANCING_LEAD_DATA_CACHE_TABLE_NAME               = var.PRE_FINANCING_LEAD_DATA_CACHE_TABLE_NAME
      PRE_FINANCING_LEAD_DATA_CACHE_TTL_DAY                  = var.PRE_FINANCING_LEAD_DATA_CACHE_TTL_DAY
      ZENVIA_API_AUTHORIZATION_HEADER_VALUE                  = var.ZENVIA_API_AUTHORIZATION_HEADER_VALUE
      SEM_SEGURO_LEAD_ORGANIC_REFERENCE_VALUE                = var.SEM_SEGURO_LEAD_ORGANIC_REFERENCE_VALUE
      CONSENTS_SNS_TOPIC_ARN                                 = var.CONSENTS_SNS_TOPIC_ARN
      GOOGLE_ANALYTICS_COLLECT_QUEUE_URL                     = var.GOOGLE_ANALYTICS_COLLECT_QUEUE_URL
      AWS_LAMBDA_EXEC_WRAPPER                                = var.DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER
      DT_TENANT                                              = var.DYNATRACE_DT_TENANT
      DT_CLUSTER_ID                                          = var.DYNATRACE_DT_CLUSTER_ID
      DT_CONNECTION_BASE_URL                                 = var.DYNATRACE_DT_CONNECTION_BASE_URL
      DT_CONNECTION_AUTH_TOKEN                               = var.DYNATRACE_DT_CONNECTION_AUTH_TOKEN
      DT_LOG_COLLECTION_AUTH_TOKEN                           = var.DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN
      DT_OPEN_TELEMETRY_ENABLE_INTEGRATION                   = var.DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION
    }
  }
  depends_on = [
    aws_iam_role.lambda_role
  ]
}

# ----------------------------------------------------------------
# LAMBDA LAYERS
# ----------------------------------------------------------------

data "aws_lambda_layer_version" "common_layer" {
  layer_name = var.common_layer_name
}

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
  name               = "carbon-acq-pre-financing-pool-direct-contact-process-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_policy_doc.json
  tags = {
    sqs-carbon-service-connector-google-analytics-collect-external-producer = "true"
  }
}
resource "aws_iam_role_policy_attachment" "carbon_lambda_sns_execution_policy" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::${var.account_id}:policy/carbon_lambda_sns_execution_policy"
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
