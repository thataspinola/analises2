# -----------------------------------------------------------------
# OUTPUTS
# -----------------------------------------------------------------

output "queue_arn" {
  value = aws_sqs_queue.queue.arn
}

output "queue_name" {
  value = var.queue_name
}

output "queue_url" {
  value = aws_sqs_queue.queue.url
}

output "queue_dlq_arn" {
  value = aws_sqs_queue.queue_dlq.arn
}

output "queue_dlq_url" {
  value = aws_sqs_queue.queue_dlq.url
}