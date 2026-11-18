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

variable "lambda_error_handling_iam_role_arn" {
  type        = string
  description = "Role da lambda de tratamento de erro"
}

variable "queue_arn" {
  type        = string
  description = "Auto transmission queue arn"
}

variable "queue_id" {
  type        = string
  description = "Auto transmission queue id/url"
}

variable "dlq_arn" {
  type        = string
  description = "Auto transmission dlq arn"
}

variable "dlq_id" {
  type        = string
  description = "Auto transmission dlq id/url"
}


variable "approved_payments_sns_arn" {
  type        = string
  description = "Approved payments sns arn"
}