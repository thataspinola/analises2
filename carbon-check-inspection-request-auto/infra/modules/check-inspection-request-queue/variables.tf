# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

# ---- WITH Default Value ----

variable "queue_name" {
  type        = string
  description = "AWS SQS queue name for Carbon Automobile Inspection Status Gather"
  default     = "carbon-check-inspection-request-auto"
}

# ---- WITHOUT Default Value ----

variable "visibility_timeout_seconds" {
  type        = string
  description = "Queue visibility timeout in seconds"
}

variable "delay_seconds" {
  type        = string
  description = "Time in seconds that the delivery of all messages in the queue will be delayed"
}

variable "dlq_message_retention_days" {
  type        = string
  description = "DLQ message rentention in days"
}

variable "check_inspection_request_lambda_role_arn" {
  type        = string
  description = "Arn of Carbon Automobile Check Inspection Request lambda role"
}
