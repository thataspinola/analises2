# ----------------------------------------------------------------
# LAMBDA ARCHIVES
# ----------------------------------------------------------------

data "archive_file" "lambda_file" {
  type        = "zip"
  source_dir  = "${path.root}/../app-abandoned-quotation/"
  output_path = "${path.root}/../app-abandoned-quotation.zip"
  excludes = setunion(
    fileset("${path.root}/../app-abandoned-quotation/", "__test__/**/*.*"),
    fileset("${path.root}/../app-abandoned-quotation/", "coverage/**/*.*"),
    fileset("${path.root}/../app-abandoned-quotation/", ".scannerwork/**/*.*"),
    [
      "jest.config.js",
    ]
  )
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
