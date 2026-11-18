# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----
variable "project_name" {
  type        = string
  description = "project name"
  default     = "carbon-acquisition-portable-device-quotation"
}

variable "aws_region" {
  type        = string
  description = "AWS region"
  default     = "ca-central-1"
}

variable "token_layer_name" {
  type        = string
  default     = "carbon_token_layer"
  description = "Token layer name"
}

variable "DYNAMODB_SEQUENCES_TABLE_NAME" {
  type        = string
  default     = "carbon-sequences"
  description = "DynamoDB sequences table name"
}

variable "carbon_api_custom_domain_path" {
  type        = string
  description = "Carbon API Gateway custom domain path"
  default     = "acquisition/portable-device/quotation"
}

variable "api_gateway_stage_name" {
  type        = string
  description = "Gateway API stage name"
  default     = "v1"
}

variable "api_gateway_http_method" {
  type        = string
  description = "Gateway API HTTP method"
  default     = "POST"
}

variable "carbon_support_create_lead_gateway_name" {
  type        = string
  description = "Carbon support create lead AWS REST API Gateway name"
  default     = "carbon-support-create-lead-gateway"
}

# ---- WITHOUT Default Value ----
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

variable "vpce" {
  type = list(string)
}

variable "lambda_memory_size" {
  type        = string
  default     = "512"
  description = "Amount of memory in MB your Lambda Function can use at runtime"
}

variable "NODE_ENV" {
  type        = string
  description = "standard NODE_ENV from Node.js"
}

variable "COUPON_API_URL" {
  type        = string
  description = "COUPON API URL"
}

variable "MULESOFT_URL" {
  type        = string
  description = "Mulesoft Gateway URL"
}

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "lambda_cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "MAX_TIME_PROCESS_QUOTATION" {
  type        = number
  description = "max time to retry get quotation"
  default     = 25
}

variable "WAITING_TIME_TO_GET_QUOTATION_IN_MILLISECONDS" {
  type        = number
  description = "waiting time to get quotation in milliseconds"
}

variable "dynatrace_aws_lambda_exec_wrapper" {
  type        = string
  description = "dynatrace_aws_lambda_exec_wrapper"
  default     = "/opt/dynatrace"
}

variable "dynatrace_oneAgent_layer" {
  type        = string
  description = "arn da layer do one agent do dynatrace"
}

variable "dynatrace_dt_tenant" {
  type        = string
  description = "host do ambiente do dynatrace"
}

variable "dynatrace_dt_cluster_id" {
  type        = string
  description = "dynatrace cluster id"
}

variable "dynatrace_dt_connection_base_url" {
  type        = string
  description = "dynatrace connection base url"
}

variable "dynatrace_open_telemetry_enable_integration" {
  type        = string
  description = "dynatrace open telemetry enable integration"
}

variable "api_gateway_throttling_burst_limit" {
  type        = number
  description = "API throttling burst limit"
}

variable "api_gateway_throttling_rate_limit" {
  type        = number
  description = "API throttling rate limit"
}

variable "carbon_api_custom_domain_fqn" {
  type        = string
  description = "Carbon API Gateway custom domain fully qualified name"
}

variable "COVERAGE_PLAN_CODES" {
  description = "Map of coverage plan codes"
  type        = map(number)
}
