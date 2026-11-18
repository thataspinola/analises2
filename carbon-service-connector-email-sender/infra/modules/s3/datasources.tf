# -----------------------------------------------------------------
# S3 ROLE & POLICIES
# -----------------------------------------------------------------

data "aws_iam_policy_document" "lambda_s3_policy_doc" {
  statement {
    sid       = "${var.bucket_name}-s3-policy-doc"
    resources = ["${aws_s3_bucket.bucket.arn}/*"]
    actions = [
      "s3:GetObject"
    ]
    principals {
      type        = "AWS"
      identifiers = [var.process_lambda_role_arn]
    }
  }
}
