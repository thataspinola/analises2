# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

# ---- WITH Default Value ----
variable "api_gateway_name" {
  type        = string
  default     = "carbon-guest-auth-verification"
  description = "gateway name"
}

variable "request_api_gateway_path_part" {
  type        = string
  description = "Gateway API path part"
  default     = "otp-request"
}

variable "request_api_gateway_stage_name" {
  type        = string
  description = "Gateway API stage name"
  default     = "v1"
}

variable "request_api_gateway_http_method" {
  type        = string
  description = "Gateway API HTTP method"
  default     = "POST"
}

variable "check_api_gateway_path_part" {
  type        = string
  description = "Gateway API path part"
  default     = "otp-check"
}

variable "check_api_gateway_stage_name" {
  type        = string
  description = "Gateway API stage name"
  default     = "v1"
}

variable "check_api_gateway_http_method" {
  type        = string
  description = "Gateway API HTTP method"
  default     = "POST"
}

variable "GOVERNANCA_DADOS_PESSOA_API_PATH" {
  type    = string
  default = "governancadados/dados-pessoa/v1/pessoa"
}

variable "PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_ANTIFRAUD_API_PATH" {
  type    = string
  default = "portais/ms-usuarios/v2/users/activation/simple/antifraud"
}

variable "PORTAIS_MSUSUARIOS_USERS_STATUS_API_PATH" {
  type    = string
  default = "portais/ms-usuarios/v2/users/status"
}

variable "SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_API_PATH" {
  type    = string
  default = "seguranca/corporativa/v1/portocom/gera-token-aa"
}

variable "CORPORATIVO_SMSSERVICE_SENDSMS_API_PATH" {
  type    = string
  default = "corporativo/smsservice/v1/send-sms"
}

variable "PORTAIS_MSUSUARIOS_USUARIO_API_PATH" {
  type    = string
  default = "portais/ms-usuarios/v1/usuario"
}

variable "BCP_API_PATH" {
  type    = string
  default = "bcp/consulta-dados/v1/dadospessoa"
}

variable "ANTIFRAUD_AUTHORIZATION_CODE" {
  type    = string
  default = "304b21088eb80fd5c4f8bb722fb2adf8"
}

variable "ORGANIZATION_ID" {
  type        = string
  description = "Organization Id"
  default     = "6t4xugkr"
}

variable "SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_API_PATH" {
  type    = string
  default = "seguranca/corporativa/v1/portocom/valida-token-aa"
}

variable "SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_PROFILENAME" {
  type        = string
  description = "PROFILE NAME to be used in seguranca corporativa portocom validatokenaa endpoint"
  default     = "OTP_HUB_VENDAS"
}

variable "SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_PROFILENAME" {
  type        = string
  description = "PROFILE NAME to be used in seguranca corporativa portocom geratokenaa endpoint"
  default     = "OTP_HUB_VENDAS"
}

variable "CORPORATIVO_SMSSERVICE_SENDSMS_SUFIXO_MENSAGEM" {
  type        = string
  description = "sms message"
  default     = "e o seu codigo de verificacao da Porto. Nao o compartilhe"
}

variable "email_templates_s3_bucket_name_preffix" {
  type        = string
  description = "Preffix from S3 bucket name where email templates are stored"
  default     = "hdv-carbon-email-"
}

variable "AWS_REGION" {
  type        = string
  description = "AWS region"
  default     = "ca-central-1"
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
variable "sender_queue_visibility_timeout_seconds" {
  type        = number
  description = "sender queue visibility timeout in seconds"
}

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

variable "lambda_timeout_sender" {
  type        = number
  description = "Sender Lambda timeout"
}

variable "lambda_cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "MULESOFT_URL" {
  type        = string
  description = "Porto Mulesoft API Gateway URL"
}

variable "SENSEDIA_URL" {
  type        = string
  description = "Sensedia Gateway URL"
}

variable "SENSEDIA_CLOUD_URL" {
  type        = string
  description = "Sensedia Cloud Gateway URL"
}

variable "SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_ORGNAME" {
  type        = string
  description = "ORG NAME to be used in seguranca corporativa portocom geratokenaa endpoint"
}

variable "SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_ORGNAME" {
  type        = string
  description = "ORG NAME to be used in seguranca corporativa portocom validatokenaa endpoint"
}

variable "dlq_message_retention_days" {
  type        = string
  description = "DLQ message rentention in days"
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
