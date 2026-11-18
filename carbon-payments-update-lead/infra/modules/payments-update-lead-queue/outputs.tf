# -----------------------------------------------------------------
# OUTPUTS
# -----------------------------------------------------------------

output "queue_arn" {
  value = aws_sqs_queue.queue.arn
}

output "queue_id" {
  value = aws_sqs_queue.queue.id
}

output "dlq_arn" {
  value = aws_sqs_queue.queue_dlq.arn
}

output "dlq_id" {
  value = aws_sqs_queue.queue_dlq.id
}

