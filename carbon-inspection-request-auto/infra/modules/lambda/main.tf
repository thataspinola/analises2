# -----------------------------------------------------------------
# LAMBDA ARCHIVES
# -----------------------------------------------------------------
data "archive_file" "lambda_archive_file" {
  type        = "zip"
  source_dir  = "${path.root}/../app/"
  output_path = "${path.root}/../${var.project_name}-lambda-app.zip"
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

resource "aws_lambda_function" "lambda_function" {
  function_name    = var.project_name
  filename         = data.archive_file.lambda_archive_file.output_path
  runtime          = "nodejs20.x"
  handler          = "index.handler"
  source_code_hash = data.archive_file.lambda_archive_file.output_base64sha256
  role             = aws_iam_role.lambda_iam_role.arn
  timeout          = var.lambda_timeout
  layers = [
    data.aws_lambda_layer_version.carbon_token_lambda_layer.arn,
    data.aws_lambda_layer_version.carbon_postponed_payment_data_layer.arn,
    var.dynatrace_oneAgent_layer
  ]
  vpc_config {
    subnet_ids         = var.vpc_subnet_ids
    security_group_ids = var.vpc_security_group_id
  }
  environment {
    variables = {
      NODE_ENV                                      = var.NODE_ENV
      SENSEDIA_URL                                  = var.SENSEDIA_URL
      SENSEDIACLOUD_URL                             = var.SENSEDIACLOUD_URL
      CHECK_INSPECTION_REQUEST_QUEUE_URL            = var.CHECK_INSPECTION_REQUEST_QUEUE_URL
      AUTO_INSURANCE_PAYMENT_NOT_READY_STATUS_VALUE = var.AUTO_INSURANCE_PAYMENT_NOT_READY_STATUS_VALUE
      VEHICLE_API_URL                               = var.VEHICLE_API_URL
      UPDATE_LEAD_API_URL                           = var.UPDATE_LEAD_API_URL
      V1_AUTO_VEHICLE_SEARCH_ENDPOINT               = var.V1_AUTO_VEHICLE_SEARCH_ENDPOINT
      V1_UPDATE_LEAD_ENDPOINT                       = var.V1_UPDATE_LEAD_ENDPOINT
      AWS_LAMBDA_EXEC_WRAPPER                       = var.DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER
      DT_TENANT                                     = var.DYNATRACE_DT_TENANT
      DT_CLUSTER_ID                                 = var.DYNATRACE_DT_CLUSTER_ID
      DT_CONNECTION_BASE_URL                        = var.DYNATRACE_DT_CONNECTION_BASE_URL
      DT_CONNECTION_AUTH_TOKEN                      = var.DYNATRACE_DT_CONNECTION_AUTH_TOKEN
      DT_LOG_COLLECTION_AUTH_TOKEN                  = var.DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN
      DT_OPEN_TELEMETRY_ENABLE_INTEGRATION          = var.DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION
    }
  }
}

# ----------------------------------------------------------------
# LAMBDA LAYERS
# ----------------------------------------------------------------

data "aws_lambda_layer_version" "carbon_token_lambda_layer" {
  layer_name = var.token_layer_name
}

data "aws_lambda_layer_version" "carbon_postponed_payment_data_layer" {
  layer_name = var.postponed_payment_data_name
}

# -----------------------------------------------------------------
# LAMBDA ROLE & POLICIES
# -----------------------------------------------------------------

data "aws_iam_policy_document" "lambda_iam_role_document" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda_iam_role" {
  name               = "${var.project_name}-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_iam_role_document.json
}

data "aws_iam_policy_document" "lambda_iam_dynamodb_role_document" {
  statement {
    actions = [
      "dynamodb:PutItem",
    ]
    resources = ["${var.dynamodb_table_arn}"]
    sid       = "AllowTableAccess"
  }
}

resource "aws_iam_role_policy" "dynamo_access" {
  name   = "${var.project_name}-lambda-dynamo-role"
  policy = data.aws_iam_policy_document.lambda_iam_dynamodb_role_document.json
  role   = aws_iam_role.lambda_iam_role.id
}

resource "aws_iam_role_policy_attachment" "carbon_inspection_request_auto_lambda_role_base_policy_attachment" {
  role       = aws_iam_role.lambda_iam_role.name
  policy_arn = "arn:aws:iam::${var.account_id}:policy/carbon_lambda_base_execution_policy"
}

resource "aws_iam_role_policy_attachment" "lambda_basic_policy" {
  role       = aws_iam_role.lambda_iam_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "AWSLambdaVPCAccessExecutionRole" {
  role       = aws_iam_role.lambda_iam_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}

# -----------------------------------------------------------------
# LAMBDA CLOUDWATCH
# -----------------------------------------------------------------

resource "aws_cloudwatch_log_group" "lambda_cloudwatch" {
  name              = "/aws/lambda/${aws_lambda_function.lambda_function.function_name}"
  retention_in_days = var.lambda_cloudwatch_log_retention
}
