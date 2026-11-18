# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----
variable "project_name" {
  type        = string
  description = "project name"
  default     = "carbon-acquisition-cellphone-quotation"
}

variable "token_layer_name" {
  type        = string
  default     = "carbon_token_layer"
  description = "Token layer name"
}

variable "EMPLOYEE_SUSEP" {
  type        = string
  description = "susep employee"
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

variable "CARBON_QUEUE_URL" {
  type        = string
  description = "Carbon queue URL"
}

variable "CHANNEL_CODE_COUPON_AUTO_APPLY" {
  type        = string
  description = "Feature flag channelCode "
}

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "cloudwatch_log_retention" {
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

variable "DENY_LEAD_QUEUE_URL" {
  type        = string
  description = "Deny lead queue URL"
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
