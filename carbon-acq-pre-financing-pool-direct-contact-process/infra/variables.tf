# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

variable "SEM_SEGURO_LEAD_ORGANIC_REFERENCE_VALUE" {
  type        = string
  description = "Sem-seguro default reference value for organic leads"
  default     = "site-institucional"
}

variable "google_analytics_queue_name" {
  type        = string
  description = "Carbon service connector google analytics queue name"
  default     = "carbon-service-connector-google-analytics-collect"
}

variable "prefix_project_name" {
  type        = string
  description = "prefix project name"
  default     = "carbon-acq-pre-financing-pool-direct-contact"
}

variable "PRE_FINANCING_LEAD_DATA_CACHE_TABLE_NAME" {
  type        = string
  description = "pre financing lead data cache table name"
  default     = "carbon-pre-financing-lead-cache"
}

variable "aws_region" {
  type        = string
  default     = "ca-central-1"
  description = "Aws region"
}

variable "PRE_FINANCING_LEAD_DATA_CACHE_TTL_DAY" {
  type        = number
  description = "TTL in day for pre financing lead data cache"
}

variable "account_id" {
  type        = string
  description = "AWS account ID"
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

variable "lambda_cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "api_gateway_path_part" {
  type        = string
  description = "Gateway API path part"
  default     = "direct-contact-request"
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

variable "api_gateway_throttling_burst_limit" {
  type        = number
  description = "API throttling burst limit"
}

variable "api_gateway_throttling_rate_limit" {
  type        = number
  description = "API throttling rate limit"
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

variable "dlq_message_retention_days" {
  type        = string
  description = "DLQ message rentention in days"
}

variable "queue_visibility_timeout_seconds" {
  type        = string
  description = "queue visibility timeout in seconds"
}

variable "queue_redrive_policy_max_receive_count" {
  type        = number
  description = "DLQ message redrive policy max receive count"
  default     = 5
}

variable "dlq_cloudwatch_metric_alarm_evaluation_periods_count" {
  type        = number
  description = "DLQ Cloudwatch metric alarm evaluation periods count"
  default     = 1
}

variable "CONSENTS_SNS_TOPIC_ARN" {
  type        = string
  description = "Consents registration SNS topic ARN"
}

variable "lambda_memory_size" {
  type        = string
  default     = "128"
  description = "Amount of memory in MB your Lambda Function can use at runtime"
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