# -----------------------------------------------------------------
# OUTPUTS
# -----------------------------------------------------------------

output "sqs_arn" {
  value = aws_sqs_queue.queue.arn
}

output "sqs_dlq_arn" {
  value = aws_sqs_queue.queue_dlq.arn
}


output "sqs_id" {
  value = aws_sqs_queue.queue.id
}

output "dlq_id" {
  value = aws_sqs_queue.queue_dlq.id
}
