# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

# ---- WITH Default Value ----

# ---- WITHOUT Default Value ----
variable "api_gateway_id" {
  type        = string
  description = "AWS API Gateway id"
}

variable "endpoint_http_method" {
  type        = string
  description = "API Gateway endpoint HTTP method"
}

variable "endpoint_resource_id" {
  type        = string
  description = "API Gateway endpoint resource ID"
}

variable "rest_api_policy_json" {
  type        = string
  description = "API Gateway Rest API policy JSON string"
}

variable "stage_name" {
  type        = string
  description = "Gateway API stage name"
}

variable "lambda_invoke_arn" {
  type        = string
  description = "Invoke arn of lambda"
}

variable "throttling_burst_limit" {
  type        = number
  description = "API throttling burst limit"
}

variable "throttling_rate_limit" {
  type        = number
  description = "API throttling rate limit"
}

variable "cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}
