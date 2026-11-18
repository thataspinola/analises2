# ----------------------------------------------------------------
# SQS QUEUE
# ----------------------------------------------------------------

resource "aws_sqs_queue" "queue" {
  name                       = var.project_name
  visibility_timeout_seconds = var.visibility_timeout_seconds
  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.queue_dlq.arn
    maxReceiveCount     = var.max_retry_lambda
  })
  depends_on = [
    aws_sqs_queue.queue_dlq
  ]
}

# ----------------------------------------------------------------
# SQS DLQ 
# ----------------------------------------------------------------

resource "aws_sqs_queue" "queue_dlq" {
  name                      = "${var.project_name}-dead-letter"
  message_retention_seconds = var.dlq_message_retention_days * 24 * 60 * 60
}

# ------------------------------------------------------------
# SUBSCRIPTION
# ------------------------------------------------------------

resource "aws_sns_topic_subscription" "sns_subscription" {
  topic_arn            = var.approved_payments_sns_arn
  protocol             = "sqs"
  endpoint             = aws_sqs_queue.queue.arn
  raw_message_delivery = true
  filter_policy = jsonencode({
    scope = ["phone", "auto", "lifeinsurance", "portable_device", "travel"]
  })
}

resource "aws_sns_topic_subscription" "sns_subscription_rejected" {
  topic_arn            = var.rejected_payments_sns_arn
  protocol             = "sqs"
  endpoint             = aws_sqs_queue.queue.arn
  raw_message_delivery = true
  filter_policy = jsonencode({
    scope    = ["phone", "auto", "lifeinsurance", "portable_device", "travel"],
    isOnline = ["true"]
  })
}




