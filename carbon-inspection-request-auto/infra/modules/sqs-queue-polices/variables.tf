# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

variable "project_name" {
  type        = string
  description = "Project Name"
}

variable "sns_topic_subscription_arn" {
  type        = string
  description = "ARN do sns de vistoria que manda mensagem para a fila"
}

variable "inspection_request_lambda_role_arn" {
  type        = string
  description = "Arn of Carbon Automobile Inspection Request lambda role"
}

variable "inspection_request_queue_arn" {
  type        = string
  description = "ARN da Lambda role que recebe mensagem da fila"
}

variable "inspection_request_queue_url" {
  type        = string
  description = "URL of AWS SQS queue for Carbon Automobile Inspection Request"
}




