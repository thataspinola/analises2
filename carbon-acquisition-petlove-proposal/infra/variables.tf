# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----
variable "aws_region" {
  type        = string
  description = "Aws region"
  default     = "ca-central-1"
}

variable "project_name" {
  type        = string
  description = "AWS project name"
  default     = "carbon-acquisition-petlove-proposal"
}

variable "carbon_api_custom_domain_path" {
  type        = string
  description = "Carbon API Gateway custom domain path"
  default     = "acquisition/petlove/proposal"
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

variable "lambda_max_memory_size" {
  type        = string
  default     = "512"
  description = "Amount of memory in MB your Lambda Function can use at runtime"
}

variable "dynatrace_aws_lambda_exec_wrapper" {
  type        = string
  description = "dynatrace_aws_lambda_exec_wrapper"
  default     = "/opt/dynatrace"
}

variable "carbon_support_create_lead_gateway_name" {
  type        = string
  description = "Carbon support create lead AWS REST API Gateway name"
  default     = "carbon-support-create-lead-gateway"
}

variable "carbon_acquisition_cart_gateway_name" {
  type        = string
  description = "Carbon support cart AWS REST API Gateway name"
  default     = "carbon-acq-shopping-cart-manage-cart-gateway"
}

variable "token_layer_name" {
  type        = string
  description = "Token layer name"
  default     = "carbon_token_layer"
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

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "lambda_cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "NODE_ENV" {
  type        = string
  description = "standard NODE_ENV from Node.js"
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

variable "PETLOVE_URL" {
  type        = string
  description = "Petlove Gateway URL"
}

variable "PETLOVE_COUPON" {
  type        = string
  description = "Grand opening Petlove coupon"
}

variable "PETLOVE_PORTO_CARD_BIN" {
  type        = string
  description = "Porto card bin to be used in Petlove simulate api for the grand opening coupon"
}
