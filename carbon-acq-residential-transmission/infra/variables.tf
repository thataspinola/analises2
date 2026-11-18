# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

variable "account_id" {
  type        = string
  description = "AWS account ID"
}

variable "vpc_subnet_ids" {
  type    = list(string)
}

variable "vpc_security_group_id" {
  type    = list(string)
}

variable "vpce" {
  type    = list(string)
}

variable "lambda_cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}


variable "NODE_ENV" {
  type        = string
  description = "standard NODE_ENV from Node.js"
}

variable "TRAVEL_QUEUE" {
  type        = string
  description = "Travel ins integration queue url"
}

variable "RESIDENTIAL_QUEUE" {
  type        = string
  description = "Home ins integration queue url"
}

variable "gateway_path_part" {
  type        = string
  description = "Gateway API path part"
  default = "transmission"
}

variable "gateway_stage_name" {
  type        = string
  description = "Gateway API stage name"
  default = "v1"
}

variable "gateway_http_method" {
  type        = string
  description = "Gateway API HTTP method"
  default = "POST"
}


variable "gateway_throttling_burst_limit" {
  type        = number
  description = "API throttling burst limit"
}

variable "gateway_throttling_rate_limit" {
  type        = number
  description = "API throttling rate limit"
}