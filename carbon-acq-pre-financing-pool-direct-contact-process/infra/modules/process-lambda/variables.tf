# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

variable "prefix_project_name" {
  type        = string
  description = "prefix project name"
}

variable "account_id" {
  type        = string
  description = "AWS account ID"
}

variable "common_layer_name" {
  type        = string
  description = "Request/Process common layer name"
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

variable "MULESOFT_URL" {
  type        = string
  description = "Porto Mulesoft API Gateway URL"
}

variable "SENSEDIA_URL" {
  type        = string
  description = "Sensedia Gateway URL"
}

variable "SENSEDIA_CLOUD_URL_INTERNAL" {
  type        = string
  description = "Sensedia Cloud Gateway URL"
}

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "lambda_cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "PRODUCAO_COMERCIAL_GDL_LEADS_MULTICANAL_PERMALINK" {
  type        = string
  description = "Produção Comercial Multicanal Lead Sem Seguro API PERMALINK"
}

variable "CREAT_LEAD_PATH" {
  type        = string
  description = "Path de criação de lead"
}

variable "UPDATE_CONTACT_REQUEST_PATH" {
  type        = string
  description = "Path de atualização de solicitação de contato do lead"
}

variable "PRE_FINANCING_LEAD_DATA_CACHE_TABLE_NAME" {
  type        = string
  description = "pre financing lead data cache table name"
}

variable "PRE_FINANCING_LEAD_DATA_CACHE_TTL_DAY" {
  type        = number
  description = "TTL in day for pre financing lead data cache"
}

variable "GOVERNANCA_DADOS_PESSOA_API_PATH" {
  type        = string
  description = "Governança Dados Pessoa API URL Path"
}

variable "AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOS_API_PATH" {
  type        = string
  description = "Auditoria Rastreabilidade CDC Consentimentos API URL path"
}

variable "ZENVIA_API_AUTHORIZATION_HEADER_VALUE" {
  type        = string
  description = "ZENVIA token used in Authorization HTTP Header"
}

variable "SEM_SEGURO_LEAD_ORGANIC_REFERENCE_VALUE" {
  type        = string
  description = "Sem-seguro default reference value for organic leads"
}

variable "CONSENTS_SNS_TOPIC_ARN" {
  type        = string
  description = "Consents registration SNS topic ARN"
}

variable "GOOGLE_ANALYTICS_COLLECT_QUEUE_URL" {
  type        = string
  description = "Carbon service connector google analytics queue URL"
}

variable "dynatrace_oneAgent_layer" {
  type        = string
  description = "arn da layer do one agent do dynatrace"
}

variable "DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER" {
  type        = string
  description = "dynatrace_aws_lambda_exec_wrapper"
}

variable "DYNATRACE_DT_TENANT" {
  type        = string
  description = "host do ambiente do dynatrace"
}

variable "DYNATRACE_DT_CLUSTER_ID" {
  type        = string
  description = "dynatrace cluster id"
}

variable "DYNATRACE_DT_CONNECTION_BASE_URL" {
  type        = string
  description = "dynatrace connection base url"
}

variable "DYNATRACE_DT_CONNECTION_AUTH_TOKEN" {
  type        = string
  description = "dynatrace connection auth token"
}

variable "DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN" {
  type        = string
  description = "dynatrace log collection auth token"
}

variable "DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION" {
  type        = string
  description = "dynatrace open telemetry enable integration"
}
