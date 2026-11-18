
# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------
variable "project_name" {
  type        = string
  description = "Project Name"
}

variable "sns_topic_subscription" {
  type        = string
  description = "ARN do sns de vistoria que manda mensagem para a fila"
}

variable "dlq_message_retention_days" {
  type        = string
  description = "DLQ message rentention in days"
}

variable "visibility_timeout_seconds" {
  type        = string
  description = "queue visibility timeout in seconds"
}
