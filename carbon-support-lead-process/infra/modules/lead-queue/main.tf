# ----------------------------------------------------------------
# SQS QUEUE
# ----------------------------------------------------------------

resource "aws_sqs_queue" "queue" {
  name                       = "${var.project_name}"
  visibility_timeout_seconds = var.visibility_timeout_seconds
  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.queue_dlq.arn
    maxReceiveCount     = var.redrive_policy_max_receive_count
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
# SQS DLQ POLICY
# ----------------------------------------------------------------

resource "aws_sqs_queue_policy" "queue_dlq_policy" {
  queue_url = aws_sqs_queue.queue_dlq.id
  policy    = data.aws_iam_policy_document.queue_dlq_policy_doc.json
}