# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

variable "visibility_timeout_seconds" {
  type        = string
  description = "sender queue visibility timeout in seconds"
}

variable "dlq_message_retention_days" {
  type        = string
  description = "DLQ message rentention in days"
}
