# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

variable "lead_queue_arn" {
  type        = string
  description = "Arn of contact requests queue"
}

variable "process_lambda_function_name" {
  type        = string
  description = "Function name of process lambda"
}