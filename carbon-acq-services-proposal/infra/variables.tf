# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

# ---- WITH Default Value ----

variable "api_gateway_http_method" {
  type        = string
  description = "Gateway API HTTP method"
  default     = "POST"
}

variable "api_gateway_stage_name" {
  type        = string
  description = "Gateway API stage name"
  default     = "v1"
}

variable "project_name" {
  type        = string
  description = "project name"
  default     = "carbon-acq-services-proposal"
}

variable "AWS_REGION" {
  type        = string
  description = "AWS region"
  default     = "ca-central-1"
}
variable "carbon_api_custom_domain_path" {
  type        = string
  description = "Carbon API Gateway custom domain path"
  default     = "acquisition/service-provision/proposal"
}

variable "dynatrace_aws_lambda_exec_wrapper" {
  type        = string
  description = "dynatrace_aws_lambda_exec_wrapper"
  default     = "/opt/dynatrace"
}

variable "FISCAL_COMPANY_CODE" {
  type        = number
  description = "FISCAL COMPANY CODE"
}


variable "carbon_support_create_lead_gateway_name" {
  type        = string
  default     = "carbon-support-create-lead-gateway"
  description = "Carbon support create lead AWS REST API Gateway name"
}

variable "carbon_acquisition_shopping_cart_manage_cart_gateway_name" {
  type        = string
  default     = "carbon-acq-shopping-cart-manage-cart-gateway"
  description = "Carbon acquisition shopping cart manage cart AWS REST API Gateway name"
}

variable "carbon_acquisition_service_order_booking_gateway_name" {
  type        = string
  default     = "carbon-acq-service-order-booking-gateway"
  description = "Carbon acquisition service order booking AWS REST API Gateway name"
}

variable "carbon_acquisition_service_order_pricing_gateway_name" {
  type        = string
  default     = "carbon-acq-services-pricing-gateway"
  description = "Carbon acquisition service order pricing AWS REST API Gateway name"
}

variable "aws_region" {
  type        = string
  default     = "ca-central-1"
  description = "Aws region"
}

variable "lambda_max_memory_size" {
  type        = number
  default     = 512
  description = "Amount of memory in MB your Lambda Function can use at runtime"
}


# ---- WITHOUT Default Value ----
variable "account_id" {
  type        = string
  description = "AWS account ID"
}

variable "vpce" {
  type        = list(string)
  description = "Api gtw vpc endpoint"
}

variable "vpc_subnet_ids" {
  type = list(string)
}

variable "vpc_security_group_id" {
  type = list(string)
}

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "NODE_ENV" {
  type        = string
  description = "standard NODE_ENV from Node.js"
}

variable "gateway_throttling_burst_limit" {
  type        = number
  description = "API throttling burst limit"
}

variable "gateway_throttling_rate_limit" {
  type        = number
  description = "API throttling rate limit"
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

variable "SERVICE_APPOINTMENT_API" {
  type        = string
  description = "Appointment API service URL"
}

variable "ORDER_BOOKING_STRATEGY_FLAG" {
  type        = string
  description = "Flag that controls booking strategy"
}

variable "carbon_api_custom_domain_fqn" {
  type        = string
  description = "Carbon API Gateway custom domain fully qualified name"
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

variable "token_layer_name" {
  type        = string
  default     = "carbon_token_layer"
  description = "Token layer name"
}
