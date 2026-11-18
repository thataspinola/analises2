# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----

variable "queue_message_processing_batch_size" {
  type        = number
  description = "AWS Lambda Function batch size for processing AWS SQS Queue messages"
  default     = 1
}

variable "queue_message_processing_maximum_concurrency" {
  type        = number
  description = "AWS Lambda Function maximum concurrency for processing AWS SQS Queue messages"
  default     = 2
}

# ---- WITHOUT Default Value ----

variable "queue_arn" {
  type        = string
  description = "AWS SQS Queue ARN"
}

variable "lambda_function_name" {
  type        = string
  description = "AWS Lambda Function name"
}
