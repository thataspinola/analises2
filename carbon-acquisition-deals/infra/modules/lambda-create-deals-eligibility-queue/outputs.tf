
# -----------------------------------------------------------------
# OUTPUTS
# -----------------------------------------------------------------

output "queue_arn" {
  value = aws_sqs_queue.sqs_queue.arn
}

output "queue_url" {
  value = aws_sqs_queue.sqs_queue.url
}

