# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------
# ---- WITH Default Value ----

variable "function_name" {
  type        = string
  description = "AWS lambda function name"
  default     = "carbon-acquisition-auto-quotation"
}

# ---- WITHOUT Default Value ----

variable "account_id" {
  type        = string
  description = "AWS account ID"
}

variable "token_layer_name" {
  type        = string
  description = "Token layer name"
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

variable "SENSEDIA_URL" {
  type        = string
  description = "Sensedia Gateway URL"
}


variable "SENSEDIACLOUD_URL" {
  type        = string
  description = "Sensedia cloud url for api integration"
}

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "lambda_memory_size" {
  type        = string
  description = "Amount of memory in MB your Lambda Function can use at runtime"
}

variable "UPDATE_LEAD_AUTO_QUEUE_URL" {
  type        = string
  description = "Carbon automobile update lead process queue URL"
}

variable "DENY_LEAD_AUTO_QUEUE_URL" {
  type        = string
  description = "Carbon automobile deny lead process queue URL"
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

variable "HUB_VENDAS_CARBON_ACQUISITION_SHOPPING_CART_API" {
  type        = string
  description = "Carbon Acquisition Checkout API URL path"
}

variable "EIGHTY_PERCENT_DISCOUNT_STRING_LIST_CODES" {
  type        = string
  description = "Lista de códigos de desconto para 80% de desconto"
}

variable "EIGHTY_FIVE_PERCENT_DISCOUNT_STRING_LIST_CODES" {
  type        = string
  description = "List of segment codes that qualify for an 85% maximum compensation discount according to the FIPE table."
}

variable "NINETY_PERCENT_DISCOUNT_STRING_LIST_CODES" {
  type        = string
  description = "List of segment codes that qualify for an 90% maximum compensation discount according to the FIPE table."
}
