# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----
variable "api_gateway_http_method" {
  type        = string
  description = "Gateway API HTTP method"
  default     = "POST"
}

variable "carbon_api_custom_domain_path" {
  type        = string
  description = "Carbon API Gateway custom domain path"
  default     = "support/lead-async"
}

variable "api_gateway_stage_name" {
  type        = string
  description = "Gateway API stage name"
  default     = "v1"
}

variable "project_name" {
  type        = string
  description = "project name"
  default     = "carbon-support-lead"
}

variable "token_layer_name" {
  type        = string
  default     = "carbon_token_layer"
  description = "Token layer name"
}

variable "dynamics_layer_name" {
  type        = string
  default     = "dynamics_lambda_layer"
  description = "Dynamics layer name"
}

variable "queue_redrive_policy_max_receive_count" {
  type        = number
  description = "DLQ message redrive policy max receive count"
  default     = 3
}

variable "api_gateway_id" {
  type        = string
  description = "gateway id"
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

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "gateway_throttling_burst_limit" {
  type        = number
  description = "API throttling burst limit"
}

variable "gateway_throttling_rate_limit" {
  type        = number
  description = "API throttling rate limit"
}

variable "dynatrace_oneAgent_layer" {
  type        = string
  description = "arn da layer do one agent do dynatrace"
}

variable "dynatrace_dt_tenant" {
  type        = string
  description = "host do ambiente do dynatrace"
}

variable "dynatrace_aws_lambda_exec_wrapper" {
  type        = string
  description = "dynatrace_aws_lambda_exec_wrapper"
  default     = "/opt/dynatrace"
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

variable "dlq_message_retention_days" {
  type        = string
  description = "DLQ message rentention in days"
}

variable "queue_visibility_timeout_seconds" {
  type        = string
  description = "queue visibility timeout in seconds"
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
