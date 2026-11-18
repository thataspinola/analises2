# ------------------------------------------------------------
# SNS TOPIC
# ------------------------------------------------------------
resource "aws_sns_topic" "sns_topic" {
  name                             = var.name
  sqs_success_feedback_sample_rate = 100
  sqs_success_feedback_role_arn    = var.sns_logs_role_arn
  sqs_failure_feedback_role_arn    = var.sns_logs_role_arn
  kms_master_key_id                = "alias/aws/sns"
}

# ----------------------------------------------------------------
# SNS TOPIC ACCESS POLICY
# ----------------------------------------------------------------

resource "aws_sns_topic_policy" "sns_policy" {
  arn        = aws_sns_topic.sns_topic.arn
  policy     = data.aws_iam_policy_document.sns_topic_policy_doc.json
  depends_on = [aws_sns_topic.sns_topic]
}

# ----------------------------------------------------------------
# SNS ACCESS POLICY DOCUMENTS
# ----------------------------------------------------------------

data "aws_iam_policy_document" "producer_policy_doc" {
  statement {
    sid       = "carbon-create-deals-producer-policy-doc"
    resources = [aws_sns_topic.sns_topic.arn]
    actions = [
      "SNS:Publish"
    ]
    principals {
      type = "AWS"
      identifiers = [
        var.sns_producer_create_deals_lambda_role_arn,
      ]
    }
  }
}

data "aws_iam_policy_document" "fedusers_policy_doc" {
  statement {
    sid       = "carbon-create-deals-fedusers-policy-doc"
    resources = [aws_sns_topic.sns_topic.arn]
    actions = [
      "SNS:GetTopicAttributes",
      "SNS:SetTopicAttributes",
      "SNS:AddPermission",
      "SNS:RemovePermission",
      "SNS:DeleteTopic",
      "SNS:ListSubscriptionsByTopic",
      "SNS:Publish",
      "SNS:Receive"
    ]
    principals {
      type        = "Federated"
      identifiers = ["*"]
    }
  }
}

data "aws_iam_policy_document" "sns_topic_policy_doc" {
  source_policy_documents = [
    data.aws_iam_policy_document.fedusers_policy_doc.json,
    data.aws_iam_policy_document.producer_policy_doc.json
  ]
}
