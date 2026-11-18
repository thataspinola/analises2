# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----
variable "api_gateway_http_method" {
  type        = string
  description = "Gateway API HTTP method"
  default     = "POST"
}

variable "api_gateway_path_part" {
  type        = string
  description = "Gateway API path part"
  default     = "create-lead"
}

variable "api_gateway_stage_name" {
  type        = string
  description = "Gateway API stage name"
  default     = "v1"
}

variable "project_name" {
  type        = string
  description = "project name"
  default     = "carbon-support-create-lead"
}

variable "project_name_abandoned_quotation" {
  type        = string
  description = "project name"
  default     = "carbon-support-abandoned-quotation"
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

variable "LEAD_ORIGEM_HUB_SIMULADOR" {
  type        = string
  description = "Valor de origem destinado ao fluxo de oportunidade do HUB que envolve simulação para cotação"
  default     = "35"
}

variable "GOVERNANCA_DADOS_PESSOA_API_PATH" {
  type        = string
  description = "Governança Dados Pessoa API URL Path"
  default     = "governancadados/dados-pessoa/v1/pessoa"
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

variable "REGISTER_COMPLETE_GATEWAY_URL" {
  type        = string
  description = "Endereço do serviço de registro completo"
}

variable "MULESOFT_URL" {
  type        = string
  description = "Porto Mulesoft API Gateway URL"
}

variable "CREATE_LEAD_WITHOUT_BCC" {
  type        = string
  description = "endereço para a lambda de criação de lead sem chamar a BCC"
}

variable "UPDATE_LEAD" {
  type        = string
  description = "endereço para a lambda de atualização de lead"
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

variable "lambda_max_memory_size" {
  type        = number
  default     = 512
  description = "Amount of memory in MB your Lambda Function can use at runtime"
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

variable "trace_config_enable" {
  type        = string
  description = "Habilitar o trace de logs com o x-ray"
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

variable "process_lambda_maximum_retry_attempts" {
  type        = number
  description = "process lambda maximum retry attempts when lambda execution fails"
}
