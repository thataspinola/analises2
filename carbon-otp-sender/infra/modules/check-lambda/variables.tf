
# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

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

variable "token_layer_name" {
  type        = string
  description = "Token layer name"
}

variable "api_gateway_execution_arn" {
  description = "Api gateway deployment execution arn"
}

variable "lambda_cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "api_gateway_path_part" {
  type        = string
  description = "Gateway API path part"
}

variable "api_gateway_stage_name" {
  type        = string
  description = "Gateway API stage name"
}

variable "api_gateway_http_method" {
  type        = string
  description = "Gateway API HTTP method"
}

variable "NODE_ENV" {
  type        = string
  description = "standard NODE_ENV from Node.js"
}

variable "SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_API_PATH" {
  type = string
}

variable "SENSEDIA_CLOUD_URL" {
  type        = string
  description = "Sensedia Cloud Gateway URL"
}

variable "SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_ORGNAME" {
  type        = string
  description = "ORG NAME to be used in seguranca corporativa portocom validatokenaa endpoint"
}
variable "SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_PROFILENAME" {
  type        = string
  description = "PROFILE NAME to be used in seguranca corporativa portocom validatokenaa endpoint"
}
variable "OTP_REDIS_CACHE_CONN_STRING" {
  type        = string
  description = "Redis cache url to register queue message ids to be ignored through processing"
}
variable "MULESOFT_URL" {
  type        = string
  description = "Porto Mulesoft API Gateway URL"
}
variable "BCP_API_PATH" {
  description = "API URL path"
}
variable "GOVERNANCA_DADOS_PESSOA_API_PATH" {
  type        = string
  description = "Governança Dados Pessoa API URL Path"
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
