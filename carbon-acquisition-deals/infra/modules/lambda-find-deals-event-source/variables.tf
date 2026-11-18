# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

variable "api_gateway_path_part" {
  type        = string
  description = "Gateway API path part"
}

variable "api_gateway_stage_name" {
  type        = string
  description = "Gateway API stage name"
}

variable "api_gateway_http_method" {
  type        = string
  description = "Gateway API HTTP method"
}

variable "api_gateway_execution_arn" {
  description = "Api gateway deployment execution arn"
}

variable "lambda_project_name" {
  type        = string
  description = "Lambda name"
}

