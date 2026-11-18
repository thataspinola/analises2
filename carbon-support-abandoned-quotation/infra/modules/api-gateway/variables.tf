# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

variable "project_name" {
  type        = string
  description = "project name"
}

variable "vpce" {
  type = list(string)
}

variable "account_id" {
  type        = string
  description = "AWS account ID"
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
  description = "Invoke arn of lambda"
}
