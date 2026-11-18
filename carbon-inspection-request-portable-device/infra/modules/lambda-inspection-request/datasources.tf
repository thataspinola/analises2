# ----------------------------------------------------------------
# LAMBDA ARCHIVES
# ----------------------------------------------------------------

data "archive_file" "lambda_file" {
  type        = "zip"
  source_dir  = local.app_path
  output_path = local.app_zip_destination_path
  excludes = setunion(
    fileset(local.app_path, "__test__/**/*.*"),
    fileset(local.app_path, "coverage/**/*.*"),
    fileset(local.app_path, ".scannerwork/**/."),
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

data "aws_iam_policy_document" "lambda_iam_dynamodb_role_document" {
  statement {
    actions = [
      "dynamodb:PutItem",
    ]
    resources = ["${var.dynamodb_table_arn}"]
    sid       = "AllowTableAccess"
  }
}
