variable "project_name" {
  type        = string
  description = "project name"
}

variable "request_lambda_role_arn" {
  type        = string
  description = "Arn of request lambda role"
}

variable "process_lambda_role_arn" {
  type        = string
  description = "Arn of process lambda role"
}

variable "lead_queue_arn" {
  type        = string
  description = "Direct contact requests queue ARN"
}

variable "lead_queue_url" {
  type        = string
  description = "Direct contact requests queue URL"
}