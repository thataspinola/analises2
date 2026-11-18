# ----------------------------------------------------------------
# LAMBDA EVENT SOURCE
# ----------------------------------------------------------------

resource "aws_lambda_event_source_mapping" "client_lambda_event_source" {
  event_source_arn        = var.queue_arn
  enabled                 = true
  function_name           = var.lambda_function_name
  function_response_types = ["ReportBatchItemFailures"]
  batch_size              = var.queue_message_processing_batch_size
  scaling_config {
    maximum_concurrency = var.lambda_maximum_concurrency
  }
}