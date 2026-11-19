# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------
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

variable "lambda_timeout" {
  type        = number
  description = "Timeout em segundos da Lambda consumidora; visibilidade SQS usa seis vezes este valor"
}
