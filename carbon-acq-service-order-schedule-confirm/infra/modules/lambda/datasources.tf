# ----------------------------------------------------------------
# LAMBDA ARCHIVES
# ----------------------------------------------------------------

data "archive_file" "lambda_file" {
  type        = "zip"
  source_dir  = "${path.module}/../../../app/"
  output_path = "${path.module}/../../../lambda-app.zip"
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
# LAMBDA POLICY DOC
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

data "aws_lambda_layer_version" "carbon_acq_service_order_layer" {
  layer_name = var.carbon_acq_service_order_layer_name
}