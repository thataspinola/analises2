# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

variable "project_name" {
  type        = string
  description = "Project Name"
}

variable "inspection_request_lambda_role_arn" {
  type        = string
  description = "Arn of Carbon Automobile Inspection Request lambda role"
}

variable "auto_update_lead_lambda_role_arn" {
  type        = string
  description = "Arn of Carbon Automobile update lead lambda role"
}

variable "auto_quotation_lambda_role_arn" {
  type        = string
  description = "Arn of Carbon Automobile quotation lambda role"
}

variable "auto_update_lead_queue_arn" {
  type        = string
  description = "ARN da Lambda role que recebe mensagem da fila"
}

variable "auto_update_lead_queue_url" {
  type        = string
  description = "URL of AWS SQS queue for Carbon Automobile update lead"
}




