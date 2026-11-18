# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

variable "project_name" {
  type        = string
  description = "Project name"
}

variable "project_name_camel_case" {
  type        = string
  description = "Project name"
}

variable "lambda_role_arn" {
  type        = string
  description = "Travel lambda role arn"
}

variable "travel_proposal_step_function_arn" {
  type        = string
  description = "Travel proposal workflow step function arn"
}

variable "dlq_message_retention_days" {
  type        = string
  description = "DLQ message rentention in days"
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

variable "visibility_timeout_seconds" {
  type        = string
  description = "queue visibility timeout in seconds"
}
