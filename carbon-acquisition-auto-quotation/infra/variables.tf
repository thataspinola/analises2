# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----
variable "project_name" {
  type        = string
  description = "project name"
  default     = "carbon-acquisition-auto-quotation"
}

variable "token_layer_name" {
  type        = string
  default     = "carbon_token_layer"
  description = "Token layer name"
}

variable "lambda_memory_size" {
  type        = string
  default     = "128"
  description = "Amount of memory in MB your Lambda Function can use at runtime"
}

variable "carbon_auto_quotation_name" {
  type        = string
  description = "Carbon auto quotaion AWS Rest API name"
  default     = "carbon-acq-auto-quotation"
}

variable "CARBON_AUTO_QUOTATION_API_ENDPOINT_PATH" {
  type        = string
  description = "Carbon auto quotation url path"
  default     = "v1"
}

variable "AWS_REGION" {
  type        = string
  description = "AWS region"
  default     = "ca-central-1"
}

variable "UPDATE_LEAD_AUTO_QUEUE_NAME" {
  type        = string
  description = "Carbon automobile update lead process queue name"
  default     = "carbon-support-auto-update-lead"
}

variable "DENY_LEAD_AUTO_QUEUE_NAME" {
  type        = string
  description = "Carbon automobile deny lead process queue name"
  default     = "carbon-support-deny-lead-queue"
}

variable "dynatrace_aws_lambda_exec_wrapper" {
  type        = string
  description = "dynatrace_aws_lambda_exec_wrapper"
  default     = "/opt/dynatrace"
}

variable "carbon_acquisition_shopping_cart_upsert_cart_gateway_name" {
  type        = string
  default     = "carbon-acq-shopping-cart-manage-cart-gateway"
  description = "Carbon acquisition shopping cart upsert cart AWS REST API Gateway name"
}

variable "EIGHTY_PERCENT_DISCOUNT_STRING_LIST_CODES" {
  type        = string
  default     = "38, 68, 69"
  description = "List of segment codes that qualify for an 80% maximum compensation discount according to the FIPE table."
}

variable "EIGHTY_FIVE_PERCENT_DISCOUNT_STRING_LIST_CODES" {
  type        = string
  default     = "59"
  description = "List of segment codes that qualify for an 85% maximum compensation discount according to the FIPE table."
}

variable "NINETY_PERCENT_DISCOUNT_STRING_LIST_CODES" {
  type        = string
  default     = "37, 17, 18, 60, 64"
  description = "List of segment codes that qualify for an 90% maximum compensation discount according to the FIPE table."
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

variable "carbon_api_custom_domain_fqn" {
  type        = string
  description = "Carbon API Gateway custom domain fully qualified name"
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

variable "api_gateway_throttling_burst_limit" {
  type        = number
  description = "AWS API Gateway throttling burst limit"
}

variable "api_gateway_throttling_rate_limit" {
  type        = number
  description = "AWS API Gateway throttling rate limit"
}

variable "api_gateway_cloudwatch_log_retention" {
  type        = number
  description = "AWS API Gateway cloudwatch log retention in days"
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
