# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

# ---- WITH Default Value ----
variable "AWS_REGION" {
  type        = string
  description = "AWS region"
  default     = "ca-central-1"
}

variable "api_gateway_name" {
  type        = string
  description = "gateway name"
  default     = "carbon-acquisition-deals"
}

variable "lambda_name_create_deals" {
  type    = string
  default = "carbon-acquisition-deals-create-deals"
}

variable "lambda_name_create_deals_eligibility" {
  type    = string
  default = "carbon-acquisition-deals-create-deals-eligibility"
}

variable "lambda_name_create_deals_porto_pay_cards" {
  type    = string
  default = "carbon-acquisition-deals-create-deals-porto-pay"
}

variable "lambda_name_create_deals_good_card" {
  type    = string
  default = "carbon-acquisition-deals-create-deals-good-card"
}

variable "lambda_name_create_deals_card_proposals" {
  type    = string
  default = "carbon-acquisition-deals-create-deals-card-proposals"
}

variable "lambda_name_create_deals_porto_tag" {
  type    = string
  default = "carbon-acquisition-deals-create-deals-porto-tag"
}

variable "lambda_name_find_deals" {
  type    = string
  default = "carbon-acquisition-deals-find-deals"
}

variable "api_gateway_stage_name" {
  type        = string
  description = "Gateway API stage name"
  default     = "v1"
}

variable "DEALS_TABLE" {
  type        = string
  default     = "carbon-acquisition-deals"
  description = "dynamoDB Table Name"
}

variable "deals_data_layer_name" {
  type        = string
  description = "Deals data layer name"
  default     = "carbon-acquisition-deals-data"
}

variable "api_gateway_path_part_create_deals" {
  type        = string
  description = "Gateway API path part"
  default     = "create_deals"
}

variable "api_gateway_http_method_create_deals" {
  type        = string
  description = "Gateway API HTTP method"
  default     = "POST"
}

variable "api_gateway_path_part_find_deals" {
  type        = string
  description = "Gateway API path part"
  default     = "find_deals"
}

variable "api_gateway_http_method_find_deals" {
  type        = string
  description = "Gateway API HTTP method"
  default     = "GET"
}

variable "sns_producer_create_deals_lambda_role_name" {
  type        = string
  description = "sns producer create deals lambda role name to be used in sns policy document"
  default     = "carbon-acquisition-deals-create-deals-lambda-role"
}

variable "sns_create_deals_name" {
  type        = string
  description = "Name of the sns resource to be created"
  default     = "carbon-create-deals"
}

variable "dynatrace_aws_lambda_exec_wrapper" {
  type        = string
  description = "dynatrace_aws_lambda_exec_wrapper"
  default     = "/opt/dynatrace"
}

# ---- LOCALS ----
data "aws_secretsmanager_secret" "secrets" {
  name = "HUB-VENDAS-MIDDLEWARE-SECRETS"
}
data "aws_secretsmanager_secret_version" "secrets_version" {
  secret_id = data.aws_secretsmanager_secret.secrets.id
}

locals {
  dynatrace_dt_connection_auth_token     = jsondecode(nonsensitive(data.aws_secretsmanager_secret_version.secrets_version.secret_string))["DT_CONNECTION_AUTH_TOKEN"]
  dynatrace_dt_log_collection_auth_token = jsondecode(nonsensitive(data.aws_secretsmanager_secret_version.secrets_version.secret_string))["DT_LOG_COLLECTION_AUTH_TOKEN"]
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

variable "api_gateway_throttling_burst_limit" {
  type        = number
  description = "API throttling burst limit"
}

variable "api_gateway_throttling_rate_limit" {
  type        = number
  description = "API throttling rate limit"
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

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "lambda_cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "SENSEDIA_CLOUD_URL" {
  type        = string
  description = "Sensedia Cloud Gateway URL"
}

variable "SENSEDIA_URL" {
  type        = string
  description = "Sensedia Gateway URL"
}

variable "PORTOSEG_URL" {
  type        = string
  description = "Porto Seg Gateway URL"
}

variable "dlq_message_retention_days" {
  type        = string
  description = "DLQ message rentention in days"
}

variable "queue_visibility_timeout_seconds" {
  type        = string
  description = "queue visibility timeout in seconds"
}

variable "lambda_maximum_retry_attempts" {
  type        = number
  description = "Deals lambda maximum retry attempts when lambda execution fails"
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
