# ----------------------------------------------------------------
# LAMBDA ARCHIVES
# ----------------------------------------------------------------

data "archive_file" "lambda_file" {
  type        = "zip"
  source_dir  = "${path.root}/../app/"
  output_path = "${path.root}/../app-${var.project_name}.zip"
  excludes = setunion(
    fileset("${path.root}/../app/", "__test__/**/*.*"),
    fileset("${path.root}/../app/", "coverage/**/*.*"),
    fileset("${path.root}/../app/", ".scannerwork/**/*.*"),
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
  function_name    = var.project_name
  filename         = data.archive_file.lambda_file.output_path
  runtime          = "nodejs20.x"
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
    var.carbon_token_layer_arn
  ], local.dynatrace_lambda_layers, local.twistlock_lambda_layers)
  environment {
    variables = merge({
      NODE_ENV                                   = "${var.NODE_ENV}"
      SENSEDIA_URL_CONSORCIO_INTERNO             = "${var.SENSEDIA_URL_CONSORCIO_INTERNO}"
      SENSEDIA_URL_CONSORCIO_EXTERNO             = "${var.SENSEDIA_URL_CONSORCIO_EXTERNO}"
      SENSEDIA_API_TIMEOUT                       = "${var.SENSEDIA_API_TIMEOUT}"
      SENSEDIA_CORP_URL                          = "${var.SENSEDIA_CORP_INTERNAL_URL}"
      SENSEDIA_URL                               = "${var.SENSEDIA_URL}"
      SENSEDIACLOUD_URL                          = "${var.SENSEDIACLOUD_URL}"
      SENSEDIA_CORP_MIDDLEWARE_TOKEN_KEY         = "${var.SENSEDIA_CORP_MIDDLEWARE_TOKEN_KEY}"
      APF_PORTOBANK_COTA_CONSORCIO_ENDPOINT_PATH = "${var.APF_PORTOBANK_COTA_CONSORCIO_ENDPOINT_PATH}"
      APP_DEBUG                                  = "${var.ENABLE_DEBUG ? "true" : "false"}"
    }, local.dynatrace_lambda_variables, local.twistlock_lambda_variables)
  }
  depends_on = [
    aws_iam_role.lambda_role
  ]
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
