data "aws_iam_policy_document" "topic_policy_doc" {
  statement {
    sid       = "carbon-acq-service-order-requested-consumer-producer-policy-doc"
    resources = ["${var.topic_arn}"]
    actions = [
      "SNS:GetTopicAttributes",
      "SNS:SetTopicAttributes",
      "SNS:AddPermission",
      "SNS:RemovePermission",
      "SNS:DeleteTopic",
      "SNS:Subscribe",
      "SNS:ListSubscriptionsByTopic",
      "SNS:Publish",
      "SNS:Receive"
    ]
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
    condition {
      test     = "ArnLike"
      variable = "aws:PrincipalArn"
      values = [
        "arn:aws:iam::${var.account_id}:role/carbon-*"
      ]
    }
  }
}
