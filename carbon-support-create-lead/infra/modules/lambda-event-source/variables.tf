# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

variable "api_gateway_execution_arn" {
  description = "Api gateway execution arn"
}


variable "process_lambda_function_name" {
  type        = string
  description = "Function name of process lambda"
}

variable "stage_name" {
  type        = string
  description = "API stage name"
}

variable "path_part" {
  type        = string
  description = "API path part"
}

variable "http_method" {
  type        = string
  description = "API HTTP method"
}
