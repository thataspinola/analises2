# ----------------------------------------------------------------
# LAMBDA EVENT SOURCE
# ----------------------------------------------------------------

resource "aws_lambda_permission" "lambda_event_source" {
  statement_id  = "AllowExecutionFromSQS"
  action        = "lambda:InvokeFunction"
  function_name = var.process_lambda_function_name
  principal     = "sqs.amazonaws.com"
  source_arn    = var.update_lead_queue_arn
}

resource "aws_lambda_event_source_mapping" "lambda_event_source" {
  event_source_arn        = var.update_lead_queue_arn
  enabled                 = true
  function_name           = var.process_lambda_function_name
  function_response_types = ["ReportBatchItemFailures"]
  batch_size              = 1
  scaling_config {
    maximum_concurrency = 2
  }
}