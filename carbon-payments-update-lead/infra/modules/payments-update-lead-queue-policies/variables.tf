# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

variable "project_name" {
  type        = string
  description = "Project name"
}

variable "lambda_role_arn" {
  type        = string
  description = "Cellphone lambda role arn"
}

variable "queue_arn" {
  type        = string
  description = "Cellphone transmission queue arn"
}

variable "queue_id" {
  type        = string
  description = "Cellphone transmission queue id/url"
}

variable "dlq_arn" {
  type        = string
  description = "Cellphone transmission dlq arn"
}

variable "dlq_id" {
  type        = string
  description = "Cellphone transmission dlq id/url"
}

variable "approved_payments_sns_arn" {
  type        = string
  description = "Approved payments sns arn"
}

variable "rejected_payments_sns_arn" {
  type        = string
  description = "Rejected payments sns arn"
}
