# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----

variable "function_name" {
  type        = string
  description = "AWS lambda function name for Carbon Automobile Inspection Status Processing"
  default     = "carbon-acq-services-proposal"
}

# ---- WITHOUT Default Value ----

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

variable "NODE_ENV" {
  type        = string
  description = "standard NODE_ENV from Node.js"
}

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "FISCAL_COMPANY_CODE" {
  type        = number
  description = "FISCAL COMPANY CODE"
}

variable "cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "SENSEDIA_URL_SERVICO" {
  type        = string
  description = "Sensedia URL Porto Serviço"
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

variable "EXPIRATION_URL_REDIRECT" {
  type        = string
  description = "Porto Commerce URL expiration redirect"
}

variable "HUB_VENDAS_CARBON_SUPPORT_CREATE_LEAD_API" {
  type        = string
  description = "Carbon Support Create Lead API URL path"
}

variable "HUB_VENDAS_CARBON_ACQUISITION_SHOPPING_CART_API" {
  type        = string
  description = "Carbon Acquisition Checkout API URL path"
}

variable "HUB_VENDAS_CARBON_SERVICES_ORDER_BOOKING_API" {
  type        = string
  description = "Carbon Services Order Booking API URL path"
}

variable "HUB_VENDAS_CARBON_SERVICES_PRICING_API" {
  type        = string
  description = "Carbon Services Pricing API URL path"
}

variable "SERVICE_APPOINTMENT_API" {
  type        = string
  description = "Appointment API service URL"
}

variable "ORDER_BOOKING_STRATEGY_FLAG" {
  type        = string
  description = "Flag that controls booking strategy"
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

variable "token_layer_name" {
  type        = string
  description = "Token layer name"
}
