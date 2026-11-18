# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------
variable "process_lambda_function_name" {
  type        = string
  description = "Function name of process lambda"
}

variable "carbon_lead_in_progress_db_stream_arn" {
  type        = string
  description = "Arn of lead in progress dynamoDB table stream"
}

variable "process_lambda_maximum_retry_attempts" {
  type        = number
  description = "process lambda maximum retry attempts when lambda execution fails"
}