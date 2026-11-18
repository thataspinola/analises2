# ----------------------------------------------------------------
# LAMBDA ARCHIVES
# ----------------------------------------------------------------

data "archive_file" "lambda_file" {
  type        = "zip"
  source_dir  = "${path.module}/../../../app-process/"
  output_path = "${path.module}/../../../lambda-app-process.zip"
  excludes = setunion(
    fileset("${path.root}/../app-process/", "__test__/**/*.*"),
    fileset("${path.root}/../app-process/", "coverage/**/*.*"),
    [
      "jest.config.js",
      "localRunner.js"
    ]
  )
}

# -----------------------------------------------------------------
# LAMBDA POLICY DOCUMENT
# -----------------------------------------------------------------

data "aws_iam_policy_document" "lambda_role_policy_doc" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}


# ----------------------------------------------------------------
# LAMBDA LAYERS
# ----------------------------------------------------------------

data "aws_lambda_layer_version" "carbon_token_layer" {
  layer_name = var.token_layer_name
}

data "aws_lambda_layer_version" "common_layer" {
  layer_name = var.common_layer_name
}

data "aws_lambda_layer_version" "service_order_layer" {
  layer_name = var.service_order_layer_name
}
