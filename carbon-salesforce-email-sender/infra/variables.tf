# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

# ---- WITH Default Value ----

variable "aws_region" {
  type        = string
  default     = "ca-central-1"
  description = "Aws region"
}
variable "project_name" {
  type    = string
  default = "carbon-acquisition-email-notification"
}

variable "gateway_path_part" {
  type        = string
  description = "Gateway API path part"
  default     = "email-notification"
}

variable "gateway_stage_name" {
  type        = string
  description = "Gateway API stage name"
  default     = "v1"
}

variable "gateway_http_method" {
  type        = string
  description = "Gateway API HTTP method"
  default     = "POST"
}

variable "salesforce_email_sender_queue_name" {
  type        = string
  default     = "carbon-salesforce-email-sender"
  description = "Salesforce Email Sender integration queue"
}

variable "token_layer_name" {
  type        = string
  default     = "carbon_token_layer"
  description = "Token layer name"
}

variable "postponed_payment_data_name" {
  type        = string
  default     = "carbon-postponed-payment-data"
  description = "Token layer name"
}

variable "dynamo_table_name" {
  type        = string
  default     = "carbon-postponed-payment-data"
  description = "Payment Data Dynamo Table Name"
}

variable "dynatrace_aws_lambda_exec_wrapper" {
  type        = string
  description = "dynatrace_aws_lambda_exec_wrapper"
  default     = "/opt/dynatrace"
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

variable "gateway_throttling_burst_limit" {
  type        = number
  description = "API throttling burst limit"
}

variable "gateway_throttling_rate_limit" {
  type        = number
  description = "API throttling rate limit"
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

variable "lambda_cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "COMMERCE_URL" {
  type        = string
  description = "Commerce URL"
}

variable "MULESOFT_URL" {
  type        = string
  description = "Gateway MULESOFT URL"
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