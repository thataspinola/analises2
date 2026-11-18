# -----------------------------------------------------------------
# LAMBDA ARCHIVES
# -----------------------------------------------------------------

data "archive_file" "carbon_lambda_file" {
  type        = "zip"
  source_dir  = "${path.root}/../app/"
  output_path = "${path.root}/../carbon-lambda-app.zip"
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
# LAMBDA LAYERS
# ----------------------------------------------------------------

data "aws_lambda_layer_version" "carbon_token_lambda_layer" {
  layer_name = var.token_lambda_layer_name
}

# -----------------------------------------------------------------
# LAMBDA ROLE & POLICIES
# -----------------------------------------------------------------

data "aws_iam_policy_document" "carbon_lambda_role_assume_policy_doc" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}
