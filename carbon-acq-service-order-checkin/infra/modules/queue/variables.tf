# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----

# ---- WITHOUT Default Value ----
variable "queue_name" {
  type        = string
  description = "AWS SQS queue name"
}

variable "queue_dead_letter_arn" {
  type        = string
  description = "AWS SQS queue dead-letter ARN"
}

variable "message_visibility_timeout_seconds" {
  type        = number
  description = "AWS SQS message visibility timeout in seconds"
}