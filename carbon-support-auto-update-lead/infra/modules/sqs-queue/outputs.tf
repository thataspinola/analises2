# -----------------------------------------------------------------
# OUTPUTS
# -----------------------------------------------------------------

output "queue_arn" {
  value = aws_sqs_queue.sqs_queue.arn
}

output "id" {
  value = aws_sqs_queue.sqs_queue.id
}

output "queue_url" {
  value = aws_sqs_queue.sqs_queue.url
}