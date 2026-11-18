
# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------
variable "project_name" {
  type        = string
  description = "Project Name"
}

variable "dlq_message_retention_days" {
  type        = string
  description = "DLQ message rentention in days"
}

variable "visibility_timeout_seconds" {
  type        = string
  description = "queue visibility timeout in seconds"
}

variable "sns_arn_create_deals" {
  type        = string
  description = "Arn of deals sns"
}
