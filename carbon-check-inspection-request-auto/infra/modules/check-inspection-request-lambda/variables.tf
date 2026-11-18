# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----

variable "function_name" {
  type        = string
  description = "AWS lambda function name for Carbon Automobile Check Inspection Request"
  default     = "carbon-check-inspection-request-auto"
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

variable "PAYMENT_REGISTER_ENDPOINT_URL" {
  type        = string
  description = "Carbon payment register internal AWS API endpoint URL"
}

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "SENSEDIA_API_TIMEOUT" {
  type        = string
  description = "sensedia API Timeout"
  
}

variable "lambda_cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "AUTOMOVEL_PARCEIRO_MARKETPLACE_OFERTAS_COTACOES_API_PATH" {
  type        = string
  description = "Automobile product marketplace quotation deals api path for partners"
}

variable "AUTO_INSURANCE_PAYMENT_READY_SET_OF_FEEDBACKS_TEXT_SSV" {
  type        = string
  description = "Semicolon separated value of feedback text value that represents a set of feedbacks that indicates if payment is ready to be processed (there is no more pending actions from product)"
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

variable "UP_TO_FIFTEEN_MINUTES" {
  type        = number
  description = "Time since creation up to 15 minutes"
}

variable "UP_TO_TWENTY_FOUR_HOURS" {
  type        = number
  description = "Time since creation up to 24 hours"
}

variable "MAX_LIMIT" {
  type        = number
  description = "Time since creation up to max limit"
}

variable "UP_TO_FIFTEEN_MINUTES_TTL" {
  type        = number
  description = "Ttl when time since creation is up to 15 minutes"
}

variable "UP_TO_TWENTY_FOUR_HOURS_TTL" {
  type        = number
  description = "Ttl when time since creation is up to 24 hours"
}

variable "MAX_LIMIT_TTL" {
  type        = number
  description = "Ttl when time since creation is up to max limit"
}

variable "INSPECTION_REQUEST_AUTO_DLQ_URL" {
  type        = string
  description = "Inspection request auto dlq url"
}