variable "account_id" {
  type = string
  description = "AWS account ID"
}

variable "aws_region" {
  type        = string
  description = "Aws region"
}

variable "queue_name" {
  type        = string
  description = "Nome da fila sqs"
}

variable "environment" {
  type        = string
  description = "Environment name"
}

variable "project_name" {
  type        = string
  description = "Project name"
}

variable "log_retention_in_days" {
  type        = number
  description = "Specifies the number of days you want to retain log events in the specified log group. Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653, and 0 (never)."
  default     = 5
}

variable "log_level" {
  type        = string
  description = "log level"
  default     = "ERROR"
}

variable "step_function_timeout" {
  type        = number
  description = "timeout for step-function"
}

variable "step_functions_iam_role" {
  type        = string
  description = "iam role arn for step function and api gateway"
}