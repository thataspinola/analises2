# ----------------------------------------------------------------
# LAMBDA EVENT SOURCE
# ----------------------------------------------------------------

resource "aws_lambda_event_source_mapping" "lambda_event_source" {
  event_source_arn        = var.inspection_request_queue_arn
  enabled                 = true
  function_name           = var.lambda_function_name
  function_response_types = ["ReportBatchItemFailures"]
  batch_size              = 1
  scaling_config {
    maximum_concurrency = 2
  }
}