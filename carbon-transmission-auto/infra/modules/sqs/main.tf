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
    scope = ["auto"]
  })
}


# ----------------------------------------------------------------
# SQS DLQ ALARM
# ----------------------------------------------------------------

resource "aws_cloudwatch_metric_alarm" "dlq_quantity_message_alarm" {
  alarm_name          = "${aws_sqs_queue.queue_dlq.name}-not-empty-alarm"
  alarm_description   = "Items are on the ${aws_sqs_queue.queue_dlq.name} queue"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 1
  metric_name         = "ApproximateNumberOfMessagesVisible"
  namespace           = "AWS/SQS"
  period              = 300
  statistic           = "Average"
  threshold           = 1
  treat_missing_data  = "notBreaching"
  dimensions = {
    "QueueName" = aws_sqs_queue.queue_dlq.name
  }
}

resource "aws_cloudwatch_metric_alarm" "dlq_message_processed_alarm" {
  alarm_name          = "${aws_sqs_queue.queue_dlq.name}-messages-processed-alarm"
  statistic           = "Sum"
  metric_name         = "NumberOfMessagesDeleted"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  threshold           = 1
  period              = 60
  evaluation_periods  = 1
  namespace           = "AWS/SQS"
  alarm_description   = "Items saved from the ${aws_sqs_queue.queue_dlq.name} queue"
  treat_missing_data  = "notBreaching"
  alarm_actions       = [var.sns_error_notification]
  dimensions = {
    "QueueName" = aws_sqs_queue.queue_dlq.name,
  }

  depends_on = [aws_sqs_queue.queue_dlq]
}
