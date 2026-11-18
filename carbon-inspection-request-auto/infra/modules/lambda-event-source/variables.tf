# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

variable "inspection_request_queue_arn" {
  type        = string
  description = "Arn of request queue"
}

variable "lambda_function_name" {
  type        = string
  description = "Function name of inspection request lambda"
}