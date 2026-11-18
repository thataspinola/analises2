# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------
variable "queue_name" {
  type        = string
  description = "AWS SQS queue name"
  default     = "carbon-acq-service-order-request"
}

# ---- WITH Default Value ----

# ---- WITHOUT Default Value ----

variable "queue_dead_letter_arn" {
  type        = string
  description = "AWS SQS queue dead-letter ARN"
}

variable "message_visibility_timeout_seconds" {
  type        = string
  description = "AWS SQS queue message visibility timeout in seconds"
}

variable "message_redrive_policy_max_receive_count" {
  type        = number
  description = "DLQ message redrive policy max receive count"
}


