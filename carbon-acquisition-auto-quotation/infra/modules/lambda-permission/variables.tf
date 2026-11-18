# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----

# ---- WITHOUT Default Value ----
variable "lambda_function_name" {
  type        = string
  description = "Function name of process lambda"
}

variable "api_gateway_execution_arn" {
  description = "Api gateway deployment execution arn"
}

variable "api_gateway_stage_name" {
  type        = string
  description = "Gateway API stage name"
}

variable "api_gateway_http_method" {
  type        = string
  description = "Gateway API HTTP method"
}