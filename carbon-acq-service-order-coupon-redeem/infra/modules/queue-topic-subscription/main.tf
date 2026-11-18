# ------------------------------------------------------------
# SUBSCRIPTION
# ------------------------------------------------------------

resource "aws_sns_topic_subscription" "topic_sqs" {
  topic_arn           = var.sns_topic_arn
  protocol            = "sqs"
  endpoint            = var.queue_arn
  filter_policy_scope = "MessageBody"
  filter_policy       = data.template_file.queue_filter_policy.rendered
}
