# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

variable "lambda_function_name" {
  type        = string
  description = "Function name of process lambda"
}

variable "maximum_concurrency" {
  type        = string
  description = "Concorrência Máxima"
}

variable "batch_size" {
  type        = string
  description = "Tamanho do batch vindo do SQS"
}

variable "queue_arn" {
  type        = string
  description = "Cellphone transmission sqs arn"
}