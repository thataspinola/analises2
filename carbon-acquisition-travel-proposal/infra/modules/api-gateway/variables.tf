# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

variable "project_name" {
  type        = string
  description = "project name"
}

variable "aws_region" {
  type        = string
  description = "AWS region"
}

variable "step_functions_iam_role" {
  type        = string
  description = "iam role arn for step function and api gateway"
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

variable "step_function_invoke_arn" {
  type        = string
  description = "Invoke arn of Step Function"
}

variable "cloudwatch_log_retention" {
  type        = number
  description = "Cloudwatch log retention in days"
}
