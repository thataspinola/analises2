# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

variable "visibility_timeout_seconds" {
  type        = number
  nullable    = false
  description = "OTP sender queue visibility timeout in seconds"
}

variable "lambda_timeout_seconds" {
  type        = number
  nullable    = false
  description = "Timeout of the OTP sender Lambda in seconds"
}

variable "dlq_message_retention_days" {
  type        = string
  description = "DLQ message rentention in days"
}
