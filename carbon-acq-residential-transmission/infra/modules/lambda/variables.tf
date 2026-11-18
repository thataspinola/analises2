
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

variable "carbon_acquisition_transmission_gateway_rest_api_deployment_execution_arn" {
  description = "arn of client register gateway"
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
}

variable "gateway_stage_name" {
  type        = string
  description = "Gateway API stage name"
}

variable "gateway_http_method" {
  type        = string
  description = "Gateway API HTTP method"
}