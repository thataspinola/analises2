# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

variable "auto_update_lead_queue_arn" {
  type        = string
  description = "Arn of request queue"
}

variable "lambda_function_name" {
  type        = string
  description = "Function name of Auto update lead"
}