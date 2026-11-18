# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

variable "project_name" {
  type        = string
  description = "Project name"
}

variable "lambda_role_arn" {
  type        = string
  description = "Auto lambda role arn"
}

variable "sns_error_notification" {
  type        = string
  description = "Auto lambda role arn"
}

variable "approved_payments_sns_arn" {
  type        = string
  description = "Approved payments sns arn"
}

variable "batch_size" {
  type        = string
  description = "Tamanho do batch vindo do SQS"
}

variable "maximum_concurrency" {
  type        = string
  description = "Concorrência Máxima"
}

variable "max_retry_lambda" {
  type        = number
  description = "Máximo de tentativas antes de enviar para DLQ"
}

variable "dlq_message_retention_days" {
  type        = string
  description = "DLQ message rentention in days"
}

variable "visibility_timeout_seconds" {
  type        = string
  description = "Queue visibility timeout in seconds"
}
