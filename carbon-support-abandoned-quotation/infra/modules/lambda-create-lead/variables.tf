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

variable "token_layer_name" {
  type        = string
  description = "Token layer name"
}

variable "dynamics_layer_name" {
  type        = string
  default     = "dynamics_lambda_layer"
  description = "Dynamics layer name"
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

variable "REGISTER_COMPLETE_GATEWAY_URL" {
  type        = string
  description = "Endereço do serviço de registro completo"
}

variable "CREATE_LEAD_WITHOUT_BCC" {
  type        = string
  description = "endereço para a lambda de criação de lead sem chamar a BCC"
}

variable "LEAD_IN_PROGRESS_TTL_IN_MINUTES" {
  type        = string
  description = "tempo que um lead será considerado abandonado"
}

variable "DEFAULT_SUSEP" {
  type        = string
  description = "susep utilizada quando multicanal não devolve uma susep"
  default     = "CMERRJ"
}

variable "OPORTUNIDADE_ID" {
  type        = string
  description = "id de oportunidade usado no multicanal"
}

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "max_memory_size" {
  type        = string
  description = "Amount of memory in MB your Lambda Function can use at runtime"
}

variable "cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "client_register_update_sns_topic_arn" {
  type        = string
  description = "Client register update SNS Topic ARN"
}

variable "trace_config_enable" {
  type        = string
  description = "Habilitar o trace de logs com o x-ray"
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

variable "LEAD_ORIGEM_HUB_SIMULADOR" {
  type        = string
  description = "Valor de origem destinado ao fluxo de oportunidade do HUB que envolve simulação para cotação"
}

variable "GOVERNANCA_DADOS_PESSOA_API_PATH" {
  type        = string
  description = "Governança Dados Pessoa API URL Path"
}

variable "MULESOFT_URL" {
  type        = string
  description = "Porto Mulesoft API Gateway URL"
}
