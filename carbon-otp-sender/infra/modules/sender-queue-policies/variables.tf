# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

variable "request_lambda_role_arn" {
  type        = string
  description = "Arn of lambda role"
}

variable "sender_lambda_role_arn" {
  type        = string
  description = "Arn of process lambda role"
}

variable "otp_requests_queue_url" {
  type        = string
  description = "Url of antifraud request queue"
}

variable "otp_requests_queue_arn" {
  type        = string
  description = "Arn of antifraud request queue"
}
