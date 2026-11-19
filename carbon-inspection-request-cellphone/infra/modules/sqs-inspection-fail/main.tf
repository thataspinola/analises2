# ----------------------------------------------------------------
# SQS QUEUE
# ----------------------------------------------------------------

resource "aws_sqs_queue" "queue" {
  name                       = var.project_name
  # Janela de lote atual: 0 s. Somar sua duração se ela for configurada.
  visibility_timeout_seconds = max(60, 6 * var.lambda_timeout)

  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.queue_dlq.arn
    maxReceiveCount     = 10
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

