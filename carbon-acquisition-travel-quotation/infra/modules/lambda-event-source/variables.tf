# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

variable "process_lambda_function_name" {
  type        = string
  description = "Function name of process lambda"
}

variable "api_gateway_execution_arn" {
  description = "Api gateway execution arn"
}

variable "api_gateway_stage_name" {
  type        = string
  description = "Gateway API stage name"
}

variable "http_method" {
  type        = string
  description = "API HTTP method"
}
