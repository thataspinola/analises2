# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

variable "api_gateway_name" {
  type = string
}

variable "vpce" {
  type = list(string)
}

variable "path_part" {
  type        = string
  description = "Gateway API path part"
}

variable "stage_name" {
  type        = string
  description = "Gateway API stage name"
}

variable "http_method" {
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

variable "lambda_invoke_arn" {
  type        = string
  description = "Invoke arn of request lambda"
}