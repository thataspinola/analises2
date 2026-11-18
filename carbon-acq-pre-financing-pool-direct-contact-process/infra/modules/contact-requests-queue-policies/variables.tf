variable "request_lambda_role_arn" {
  type        = string
  description = "Arn of request lambda role"
}

variable "process_lambda_role_arn" {
  type        = string
  description = "Arn of process lambda role"
}

variable "contact_requests_queue_arn" {
  type        = string
  description = "Direct contact requests queue ARN"
}

variable "contact_requests_queue_url" {
  type        = string
  description = "Direct contact requests queue URL"
}