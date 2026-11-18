# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

variable "project_name" {
  type        = string
  description = "project name"
}

variable "account_id" {
  type        = string
  description = "AWS account ID"
}

variable "project_name_camel_case" {
  type        = string
  description = "Project name em camel case"
}

variable "queue_id" {
  type        = string
  description = "queue_url da fila"
}

variable "lambda_role_arn" {
  type        = string
  description = "Travel lambda role arn"
}

variable "update_lead_queue_arn" {
  type        = string
  description = "arn update-lead-queue"
}

variable "travel_proposal_step_function_arn" {
  type        = string
  description = "Travel proposal workflow step function arn"
}

variable "api_gateway_arn" {
  type        = string
  description = "api gateway productor"
}

variable "api_gateway_role_name" {
  type        = string
  description = "name of api gateway role"
}
