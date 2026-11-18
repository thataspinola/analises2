# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------
variable "project_name" {
  type        = string
  description = "project name"
}

variable "lambda_role_arn" {
  type        = string
  description = "Arn of process lambda role"
}

variable "queue_url" {
  type        = string
  description = "Url of deals request queue"
}

variable "queue_arn" {
  type        = string
  description = "Arn of deals request queue"
}

variable "sns_arn_create_deals" {
  type        = string
  description = "Arn of deals sns"
}
