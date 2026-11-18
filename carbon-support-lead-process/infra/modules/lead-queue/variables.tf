# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------
variable "project_name" {
  type        = string
  description = "project name"
}

variable "dlq_message_retention_days" {
  type        = string
  description = "DLQ message rentention in days"
}

variable "visibility_timeout_seconds" {
  type        = string
  description = "queue visibility timeout in seconds"
}

variable "redrive_policy_max_receive_count" {
  type        = number
  description = "DLQ message redrive policy max receive count"
}
