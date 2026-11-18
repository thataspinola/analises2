# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

variable "api_gateway_name" {
  type        = string
  description = "dynamoDB Table Name"
}

variable "vpce" {
  type = list(string)
}

variable "request_path_part" {
  type        = string
  description = "Gateway API path part"
}

variable "request_stage_name" {
  type        = string
  description = "Gateway API stage name"
}

variable "request_http_method" {
  type        = string
  description = "Gateway API HTTP method"
}

variable "check_path_part" {
  type        = string
  description = "Gateway API path part"
}

variable "check_stage_name" {
  type        = string
  description = "Gateway API stage name"
}

variable "check_http_method" {
  type        = string
  description = "Gateway API HTTP method"
}

variable "throttling_burst_limit" {
  type        = number
  description = "API throttling burst limit"
}

variable "throttling_rate_limit" {
  type        = number
  description = "API throttling rate limit"
}

variable "request_lambda_invoke_arn" {
  type        = string
  description = "Invoke arn of request lambda"
}

variable "check_lambda_invoke_arn" {
  type        = string
  description = "Invoke arn of check lambda"
}