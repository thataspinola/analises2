# ----------------------------------------------------------------
# LAMBDA ARCHIVES
# ----------------------------------------------------------------

data "archive_file" "lambda_file" {
  type        = "zip"
  source_dir  = "${path.root}/../app-create-lead/"
  output_path = "${path.root}/../app-create-lead.zip"
  excludes = setunion(
    fileset("${path.root}/../app-create-lead/", "__test__/**/*.*"),
    fileset("${path.root}/../app-create-lead/", "coverage/**/*.*"),
    fileset("${path.root}/../app-create-lead/", ".scannerwork/**/*.*"),
    [
      "jest.config.js",
      "localRunner.js"
    ]
  )
}

# ----------------------------------------------------------------
# LAMBDA LAYERS
# ----------------------------------------------------------------

data "aws_lambda_layer_version" "carbon_token_layer" {
  layer_name = var.token_layer_name
}

data "aws_lambda_layer_version" "dynamics_lambda_layer" {
  layer_name = var.dynamics_layer_name
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
