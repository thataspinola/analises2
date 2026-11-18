# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------
variable "process_lambda_function_name" {
  type        = string
  description = "Function name of process lambda"
}

variable "inspection_request_auto_gather_schedule_db_stream_arn" {
  type        = string
  description = "Arn of inspection request auto gather schedule dynamoDB table stream"
}

variable "process_lambda_maximum_retry_attempts" {
  type        = number
  description = "process lambda maximum retry attempts when lambda execution fails"
}

variable "check_inspection_request_queue_arn" {
  type        = string
  description = "Arn of request queue"
}