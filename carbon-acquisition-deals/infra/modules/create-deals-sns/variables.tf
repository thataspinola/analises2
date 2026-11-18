# ------------------------------------------------------------
# VARIABLES
# ------------------------------------------------------------

variable "sns_logs_role_arn" {
  type        = string
  description = "Sns iam role to allow cloudwatch logging"
}

variable "sns_producer_create_deals_lambda_role_arn" {
  type        = string
  description = "sns producer create deals lambda role name to be used in sns policy document"
}

variable "name" {
  type        = string
  description = "sns name"
}
