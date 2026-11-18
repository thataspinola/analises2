# ----------------------------------------------------------------
# SQS QUEUE
# ----------------------------------------------------------------

resource "aws_sqs_queue" "queue" {
  name                       = var.queue_name
  visibility_timeout_seconds = var.message_visibility_timeout_seconds
  redrive_policy = jsonencode({
    deadLetterTargetArn = var.queue_dead_letter_arn
    maxReceiveCount     = var.message_redrive_policy_max_receive_count
  })
}