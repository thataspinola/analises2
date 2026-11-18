# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

variable "otp_requests_queue_arn" {
  type        = string
  description = "Arn of otp request queue"
}

variable "sender_lambda_function_name" {
  type        = string
  description = "Function name of otp sender lambda"
}