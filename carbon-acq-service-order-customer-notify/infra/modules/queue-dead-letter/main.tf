# ----------------------------------------------------------------
# SQS QUEUE DEAD-LETTER
# ----------------------------------------------------------------

resource "aws_sqs_queue" "queue" {
  name                       = "${var.queue_name}-dead-letter"
  visibility_timeout_seconds = var.message_visibility_timeout_seconds
  message_retention_seconds  = var.message_retention_days * 24 * 60 * 60
}

# ----------------------------------------------------------------
# SQS QUEUE DEAD-LETTER ALARM
# ----------------------------------------------------------------

resource "aws_cloudwatch_metric_alarm" "queue_dead_letter_alarm" {
  alarm_name          = "${aws_sqs_queue.queue.name}-not-empty-alarm"
  alarm_description   = "Items are on the ${aws_sqs_queue.queue.name} queue"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = var.cloudwatch_metric_alarm_evaluation_periods_count
  metric_name         = "ApproximateNumberOfMessagesVisible"
  namespace           = "AWS/SQS"
  period              = 600
  statistic           = "Average"
  threshold           = 20
  treat_missing_data  = "notBreaching"
  dimensions = {
    "QueueName" = aws_sqs_queue.queue.name
  }
  depends_on = [
    aws_sqs_queue.queue
  ]
}