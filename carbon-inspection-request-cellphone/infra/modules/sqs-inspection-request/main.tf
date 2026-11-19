# ----------------------------------------------------------------
# SQS QUEUE
# ----------------------------------------------------------------

resource "aws_sqs_queue" "queue" {
  name                       = var.project_name
  # Janela de lote atual: 0 s. Somar sua duração se ela for configurada.
  visibility_timeout_seconds = max(120, 6 * var.lambda_timeout)

  redrive_policy = jsonencode({
    deadLetterTargetArn = var.request_fail_sqs_arn
    maxReceiveCount     = 6
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
  topic_arn            = var.inspection_ready_sns_arn
  protocol             = "sqs"
  endpoint             = aws_sqs_queue.queue.arn
  raw_message_delivery = true
  filter_policy = jsonencode({
    scope = ["phone"]
  })
  depends_on = [
    aws_sqs_queue.queue
  ]
}

# ----------------------------------------------------------------
# LAMBDA EVENT SOURCE
# ----------------------------------------------------------------

resource "aws_lambda_event_source_mapping" "lambda_event_source" {
  event_source_arn        = aws_sqs_queue.queue.arn
  enabled                 = true
  function_name           = var.lambda_name
  function_response_types = ["ReportBatchItemFailures"]
  batch_size              = 10
  scaling_config {
    maximum_concurrency = 5
  }
  depends_on = [
    aws_sqs_queue.queue
  ]
}

