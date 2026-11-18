# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

variable "project_name" {
  type        = string
  description = "project name"
}

variable "account_id" {
  type        = string
  description = "AWS account ID"
}

variable "carbon_token_layer_arn" {
  type        = string
  description = "Hub de Vendas Carbon AWS Lambda layer ARN"
}

variable "ENABLE_DEBUG" {
  type        = bool
  description = "Enables adittional logging for debugging purposes"
}

variable "vpc_subnet_ids" {
  type = list(string)
}

variable "vpc_security_groups_ids" {
  type = list(string)
}

variable "is_poc" {
  type        = bool
  description = "Indicates if the current server is proof of concept aimed (That lambda and related resources will not access coorporative network and internet)"
}
variable "NODE_ENV" {
  type        = string
  description = "standard NODE_ENV from Node.js"
}

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "SENSEDIA_API_TIMEOUT" {
  type        = number
  description = "Sensedia timeout"
}

variable "max_memory_size" {
  type        = string
  description = "Amount of memory in MB your Lambda Function can use at runtime"
}

variable "twistlock_layer_arn" {
  type        = string
  description = "arn da layer do twistlock"
}
variable "SENSEDIA_CORP_MIDDLEWARE_TOKEN_KEY" {
  type        = string
  description = "Sensedia Porto Corporative Api Gateway external Middleware (legacy) token key"
}

variable "SENSEDIA_URL_CONSORCIO_INTERNO" {
  type        = string
  description = "Sensedia Gateway URL consórcio interno"
}
variable "SENSEDIA_URL_CONSORCIO_EXTERNO" {
  type        = string
  description = "Sensedia Gateway URL consórcio externo"
}

variable "SENSEDIA_URL" {
  type        = string
  description = "Sensedia Gateway URL"
}

variable "SENSEDIACLOUD_URL" {
  type        = string
  description = "Sensedia cloud url for api integration"
}
variable "TWISTLOCK_DISABLED" {
  type        = bool
  description = "Indicates if Palo Alto Networks Defender Serverless need to be disabled"
}
variable "TWISTLOCK_POLICY" {
  type        = string
  description = "Palo Alto Networks Defender Serverless policy"
}
variable "SENSEDIA_CORP_INTERNAL_URL" {
  type        = string
  description = "Sensedia Porto Corporative Api Gateway external URL"
}
variable "APF_PORTOBANK_COTA_CONSORCIO_ENDPOINT_PATH" {
  type        = string
  description = "APF PortoBank Cota Consórcio endpoint path"
  default     = "data-porto-bank/cota-consorcio-ia/v1/cotas"
}

variable "cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
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
