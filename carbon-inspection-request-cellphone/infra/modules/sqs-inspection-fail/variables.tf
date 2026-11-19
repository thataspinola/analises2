# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------
variable "lambda_timeout" {
  type        = number
  description = "Timeout da Lambda consumidora em segundos; visibilidade usa margem de seis vezes este valor"
}

variable "project_name" {
  type        = string
  description = "Project name ready to use in the resouse"
}

variable "lambda_name" {
  type        = string
  description = "Nome da Lambda que irá realizar o trigger"
}

variable "dlq_message_retention_days" {
  type        = string
  description = "DLQ message rentention in days"
}

