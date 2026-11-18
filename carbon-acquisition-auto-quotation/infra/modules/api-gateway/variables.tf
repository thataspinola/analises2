# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

# ---- WITH Default Value ----
variable "api_gateway_name" {
  type        = string
  description = "AWS REST API Gateway name"
  default     = "carbon-acq-auto-quotation"
}

variable "http_method" {
  type        = string
  description = "Gateway API HTTP method"
  default     = "POST"
}

variable "stage_name" {
  type        = string
  description = "Gateway API stage name"
  default     = "v1"
}

# ---- WITHOUT Default Value ----
variable "vpce" {
  type = list(string)
}

variable "account_id" {
  type        = string
  description = "AWS account ID"
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

variable "cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}
