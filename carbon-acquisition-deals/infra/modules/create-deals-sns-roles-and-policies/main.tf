# ----------------------------------------------------------------
# SNS IAM ROLE, POLICY DOCUMENTS AND POLICIES
# ----------------------------------------------------------------

data "aws_iam_policy_document" "sns_assume_policy_doc" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["sns.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "sns_logs_policy_doc" {
  statement {
    sid       = "carbonDealsSNSLogsPolicyDoc"
    resources = ["*"]
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
      "logs:PutMetricFilter",
      "logs:PutRetentionPolicy"
    ]
  }
}

resource "aws_iam_policy" "sns_logs_policy" {
  name   = "create_deals_sns_logs_policy"
  policy = data.aws_iam_policy_document.sns_logs_policy_doc.json
}

# ----------------------------------------------------------------
# IAM ROLE AND POLICY ATTACHMENT
# ----------------------------------------------------------------

resource "aws_iam_role" "sns_role" {
  name               = "carbon-deals-sns-role"
  assume_role_policy = data.aws_iam_policy_document.sns_assume_policy_doc.json
}

resource "aws_iam_role_policy_attachment" "lambda_role_policy_attachment" {
  role       = aws_iam_role.sns_role.name
  policy_arn = aws_iam_policy.sns_logs_policy.arn
}
