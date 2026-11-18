
# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

variable "project_name" {
  type        = string
  description = "project name"
}

variable "account_id" {
  type        = string
  description = "AWS account ID"
}

variable "vpc_subnet_ids" {
  type = list(string)
}

variable "vpc_security_group_id" {
  type = list(string)
}

variable "api_gateway_execution_arn" {
  description = "Api gateway deployment execution arn"
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

variable "api_gateway_stage_name" {
  type        = string
  description = "Gateway API stage name"
}

variable "api_gateway_http_method" {
  type        = string
  description = "Gateway API HTTP method"
}

variable "dynatrace_oneAgent_layer" {
  type        = string
  description = "arn da layer do one agent do dynatrace"
}

variable "DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER" {
  type        = string
  description = "dynatrace_aws_lambda_exec_wrapper"
}

variable "DYNATRACE_DT_TENANT" {
  type        = string
  description = "host do ambiente do dynatrace"
}

variable "DYNATRACE_DT_CLUSTER_ID" {
  type        = string
  description = "dynatrace cluster id"
}

variable "DYNATRACE_DT_CONNECTION_BASE_URL" {
  type        = string
  description = "dynatrace connection base url"
}

variable "DYNATRACE_DT_CONNECTION_AUTH_TOKEN" {
  type        = string
  description = "dynatrace connection auth token"
}

variable "DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN" {
  type        = string
  description = "dynatrace log collection auth token"
}

variable "DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION" {
  type        = string
  description = "dynatrace open telemetry enable integration"
}

variable "max_memory_size" {
  type        = string
  description = "Amount of memory in MB your Lambda Function can use at runtime"
}

variable "HUB_VENDAS_CARBON_SUPPORT_CREATE_LEAD_API" {
  type        = string
  description = "Carbon Support Create Lead API URL path"
}

variable "HUB_VENDAS_CARBON_ACQUISITION_CART_CHECKOUT_API" {
  type        = string
  description = "Carbon Acquisition Cart API URL path"
}

variable "COMMERCE_URL" {
  type        = string
  description = "Commerce Maegento URL Porto Serviço"
}

variable "API_PATH_COTACAO" {
  type        = string
  description = "Porto Commerce Quotation API URL path"
}

variable "API_PATH_PROPOSAL" {
  type        = string
  description = "Porto Commerce Proposal API URL path"
}

variable "URL_CART_REDIRECT" {
  type        = string
  description = "Porto Commerce URL cart redirect"
}

variable "token_layer_name" {
  type        = string
  description = "Token layer name"
}

variable "PETLOVE_URL" {
  type        = string
  description = "Petlove url"
}

variable "PETLOVE_COUPON" {
  type        = string
  description = "Grand opening Petlove coupon"
}

variable "PETLOVE_PORTO_CARD_BIN" {
  type        = string
  description = "Porto card bin to be used in Petlove simulate api for the grand opening coupon"
}
