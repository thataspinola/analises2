# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

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

variable "NODE_ENV" {
  type        = string
  description = "standard NODE_ENV from Node.js"
}

variable "SENSEDIA_URL" {
  type        = string
  description = "Sensedia Gateway URL"
}

variable "SENSEDIA_CLOUD_URL" {
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

variable "PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_ANTIFRAUD_API_PATH" {
  type        = string
  description = "Portais ms-usuarios users activation simple antifraud API URL path"
}

variable "PORTAIS_MSUSUARIOS_USERS_STATUS_API_PATH" {
  type        = string
  description = "Portais ms-usuarios get status lg01 API URL path"
}

variable "SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_API_PATH" {
  type = string
}

variable "CORPORATIVO_SMSSERVICE_SENDSMS_API_PATH" {
  type = string
}

variable "SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_ORGNAME" {
  type        = string
  description = "ORG NAME to be used in seguranca corporativa portocom geratokenaa endpoint"
}

variable "SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_ORGNAME" {
  type        = string
  description = "ORG NAME to be used in seguranca corporativa portocom validatokenaa endpoint"
}

variable "SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_PROFILENAME" {
  type        = string
  description = "PROFILE NAME to be used in seguranca corporativa portocom geratokenaa endpoint"
}

variable "CORPORATIVO_SMSSERVICE_SENDSMS_SUFIXO_MENSAGEM" {
  type        = string
  description = "sms message"
}

variable "ANTIFRAUD_AUTHORIZATION_CODE" {
  type        = string
  description = "Antifraud authorization code"
}

variable "OTP_REDIS_CACHE_CONN_STRING" {
  type        = string
  description = "Redis cache url to register queue message ids to be ignored through processing"
}

variable "MULESOFT_URL" {
  type        = string
  description = "Porto Mulesoft API Gateway URL"
}

variable "GOVERNANCA_DADOS_PESSOA_API_PATH" {
  type        = string
  description = "Governança Dados Pessoa API URL Path"
}

variable "CARBON_EMAIL_SENDER_QUEUE_URL" {
  type        = string
  description = "Carbon email sender queue URL"
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
