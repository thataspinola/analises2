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
  default     = "quotation/travel"
}

variable "api_gateway_stage_name" {
  type        = string
  description = "Gateway API stage name"
  default     = "v1"
}

variable "project_name" {
  type        = string
  description = "AWS api serveless gateway name"
  default     = "carbon-acquisition-travel-quotation"
}

variable "token_layer_name" {
  type        = string
  default     = "carbon_token_layer"
  description = "Token layer name"
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

variable "carbon_api_custom_domain_fqn" {
  type        = string
  description = "Carbon API Gateway custom domain fully qualified name"
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

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "OFERTAS_API_PATH" {
  type        = string
  description = "Path oferta da api viagem-on"
}

variable "GATEWAY_URL" {
  type        = string
  description = "Sensedia Gateway URL"
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

variable "gateway_throttling_burst_limit" {
  type        = number
  description = "API throttling burst limit"
}

variable "gateway_throttling_rate_limit" {
  type        = number
  description = "API throttling rate limit"
}

variable "COUPON_API_URL" {
  type        = string
  description = "COUPON API URL"
}
# ----------------------------------------------------------------
# TIMEOUTS
# Only the quotation (oferta) call is time-boxed; the token and coupon calls are
# fast enough not to need one. The effective timeout is the lower of
# OFERTA_API_TIMEOUT_MS and the lambda remaining time minus
# LAMBDA_RESPONSE_RESERVE_MS, so the lambda can always return a response.
# ----------------------------------------------------------------

variable "OFERTA_API_TIMEOUT_MS" {
  type        = string
  description = "Ofertas API response timeout in milliseconds"
  default     = "27000"
}


variable "LAMBDA_RESPONSE_RESERVE_MS" {
  type        = string
  description = "Time reserved from the lambda budget to build and return the response in milliseconds"
  default     = "2000"
}

