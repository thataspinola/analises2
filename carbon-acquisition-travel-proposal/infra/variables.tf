# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----
variable "aws_region" {
  type        = string
  default     = "ca-central-1"
  description = "Aws region"
}

variable "project_name" {
  type        = string
  description = "Project name"
  default     = "carbon-acq-travel-proposal-workflow"
}

variable "queue_name" {
  type        = string
  description = "Nome da fila sqs"
  default     = "carbon-support-update-lead"
}

variable "api_gateway_http_method" {
  type        = string
  description = "Gateway API HTTP method"
  default     = "POST"
}

variable "carbon_api_custom_domain_path" {
  type        = string
  description = "Carbon API Gateway custom domain path"
  default     = "proposal/travel"
}

variable "api_gateway_stage_name" {
  type        = string
  description = "Gateway API stage name"
  default     = "v1"
}

variable "cloudwatch_log_retention" {
  type        = number
  description = "Specifies the number of days you want to retain log events in the specified log group. Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653, and 0 (never)."
  default     = 5
}

variable "log_level" {
  type        = string
  description = "log level"
  default     = "ERROR"
}

# ---- WITHOUT Default Value ----

variable "carbon_api_custom_domain_fqn" {
  type        = string
  description = "Carbon API Gateway custom domain fully qualified name"
}

variable "account_id" {
  type        = string
  description = "AWS account ID"
}

variable "environment" {
  type        = string
  description = "Environment name"
}

variable "step_function_timeout" {
  type        = number
  description = "timeout for step-function"
}

variable "vpce" {
  type = list(string)
}

variable "gateway_throttling_burst_limit" {
  type        = number
  description = "API throttling burst limit"
}

variable "gateway_throttling_rate_limit" {
  type        = number
  description = "API throttling rate limit"
}