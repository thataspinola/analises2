# ----------------------------------------------------------------
# LAMBDA EVENT SOURCE
# ----------------------------------------------------------------

resource "aws_lambda_event_source_mapping" "lambda_event_source" {
  event_source_arn               = var.inspection_request_auto_gather_schedule_db_stream_arn
  enabled                        = true
  function_name                  = var.process_lambda_function_name
  bisect_batch_on_function_error = true
  starting_position              = "TRIM_HORIZON"
  maximum_retry_attempts         = var.process_lambda_maximum_retry_attempts
  filter_criteria {
    filter {
      pattern = "{\"userIdentity\": {\"type\": [\"Service\"], \"principalId\": [\"dynamodb.amazonaws.com\"]}}"
    }
  }
  function_response_types = ["ReportBatchItemFailures"]
  batch_size              = 5
}

resource "aws_lambda_event_source_mapping" "lambda_event_source_sqs" {
  event_source_arn        = var.check_inspection_request_queue_arn
  enabled                 = true
  function_name           = var.process_lambda_function_name
  function_response_types = ["ReportBatchItemFailures"]
  batch_size              = 1
  scaling_config {
    maximum_concurrency = 5
  }
}