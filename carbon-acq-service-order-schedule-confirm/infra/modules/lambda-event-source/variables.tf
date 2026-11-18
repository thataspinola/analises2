# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----

# ---- WITHOUT Default Value ----
variable "queue_arn" {
  type        = string
  description = "AWS SQS (feeded by SNS) queue ARN"
}

variable "lambda_function_name" {
  type        = string
  description = "AWS Lambda function (that will handle SQS messages received through SNS) name"
}

variable "lambda_maximum_concurrency" {
  type        = number
  description = "AWS Lambda function (that will handle SQS messages received through SNS) maximum allowed concurrency"
}

variable "queue_message_processing_batch_size" {
  type        = number
  description = "AWS SQS (feeded by SNS) queue message processing batch size"
}
