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
  timeout          = var.timeout
  memory_size      = var.max_memory_size
  vpc_config {
    subnet_ids         = local.vpc_subnet_ids
    security_group_ids = local.vpc_security_groups_ids
  }

  layers = concat([
    #include here dynatrace/twistlock NOT RELATED layers
    var.carbon_token_layer_arn,
    var.dynamics_layer_arn
  ], local.dynatrace_lambda_layers, local.twistlock_lambda_layers)

  environment {
    variables = merge({
      #include here dynatrace/twistlock NOT RELATED variables
      NODE_ENV     = "${var.NODE_ENV}"
      SENSEDIA_URL = var.SENSEDIA_URL
    }, local.dynatrace_lambda_variables, local.twistlock_lambda_variables)
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
  assume_role_policy = data.aws_iam_policy_document.lambda_role_policy_doc.json
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
  policy = data.aws_iam_policy_document.lambda_iam_lead_in_progress_dynamodb_table_role_document.json
  role   = aws_iam_role.lambda_role.id
}

# ----------------------------------------------------------------
# LAMBDA CLOUDWATCH
# ----------------------------------------------------------------

resource "aws_cloudwatch_log_group" "lambda_cloudwatch" {
  name              = "/aws/lambda/${aws_lambda_function.lambda.function_name}"
  retention_in_days = var.cloudwatch_log_retention
}
