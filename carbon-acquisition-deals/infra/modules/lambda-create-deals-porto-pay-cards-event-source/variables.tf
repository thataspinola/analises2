# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

variable "lambda_project_name" {
  type        = string
  description = "Lambda name"
}

variable "queue_arn" {
  type        = string
  description = "Arn do SQS de entrada"
}
