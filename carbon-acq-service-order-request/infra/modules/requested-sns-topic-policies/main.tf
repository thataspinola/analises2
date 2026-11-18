resource "aws_sns_topic_policy" "topic_policy" {
  arn    = var.topic_arn
  policy = data.aws_iam_policy_document.topic_policy_doc.json
}
