# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

# ---- WITH Default Value ----

variable "AWS_REGION" {
  type        = string
  description = "AWS region"
  default     = "ca-central-1"
}

variable "PAYMENT_REGISTER_API_GATEWAY_RESOURCE_PATH_PART" {
  type        = string
  description = "Carbon payment register internal AWS API Gateway stage URL"
  default     = "payments-register"
}

variable "inspection_request_lambda_role_name" {
  type        = string
  description = "Arn of Carbon Automobile Inspection Request lambda role name"
  default     = "carbon-inspection-request-auto-lambda-role"
}

variable "AUTOMOVEL_PARCEIRO_MARKETPLACE_OFERTAS_COTACOES_API_PATH" {
  type        = string
  description = "Automobile product marketplace quotation deals api path for partners"
  default     = "automovel/parceiro-marketplace/v1/ofertas/cotacoes"
}

variable "AUTO_INSURANCE_PAYMENT_READY_SET_OF_FEEDBACKS_TEXT_SSV" {
  type        = string
  description = "Semicolon separated value of feedback text value that represents a set of feedbacks that indicates if payment is ready to be processed (there is no more pending actions from product)"
  default     = "PROPOSTA PENDENTE - AGUARDANDO PAGAMENTO;SERVICO DE INTEGRACAO INDISPONIVEL;SERVICO DE PARCELAMENTO INDISPONIVEL"
}

variable "AUTO_INSURANCE_PAYMENT_READY_MAIN_FEEDBACK" {
  type        = string
  description = "Value of feedback text value that indicates if payment is ready to be processed (there is no more pending actionsf from product)"
  default     = "PROPOSTA PENDENTE - AGUARDANDO PAGAMENTO"
}

variable "AUTO_INSURANCE_PAYMENT_READY_FIXED_SET_OF_FEEDBACKS" {
  type        = bool
  description = "Defines if a set of feedbacks that indicates if payment is ready to be processed (there is no more pending actions from product) need to be the unique set of feedbacks gathered"
  default     = true
}

variable "PAYMENT_REGISTER_STATUS_REJECTED" {
  type        = string
  description = "Carbon payment register status value that indicates if a payment was rejected"
  default     = "REPROVED"
}

variable "AUTO_INSURANCE_PAYMENT_NOT_READY_STATUS_VALUE" {
  type        = string
  description = "Status text value that indicates if payment is pending to be processed"
  default     = "PAGAMENTO NAO LIBERADO"
}

variable "dynatrace_aws_lambda_exec_wrapper" {
  type        = string
  description = "dynatrace_aws_lambda_exec_wrapper"
  default     = "/opt/dynatrace"
}

variable "SENSEDIA_API_TIMEOUT" {
  type        = string
  description = "sensedia API Timeout"
  default     = "20000"
}

variable "token_layer_name" {
  type        = string
  description = "Token layer name"
  default     = "carbon_token_layer"
}

# ---- WITHOUT Default Value ----
variable "account_id" {
  type        = string
  description = "AWS account ID"
}

variable "vpce" {
  type        = list(string)
  description = "Api gtw vpc endpoint"
}

variable "vpc_subnet_ids" {
  type = list(string)
}

variable "vpc_security_group_id" {
  type = list(string)
}

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "lambda_cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}


variable "dlq_message_retention_days" {
  type        = string
  description = "DLQ message rentention in days"
}

variable "inspection_status_gather_queue_individual_message_delay_seconds_first_day" {
  type        = number
  description = "Inspection status gather queue individual messages delay in seconds for the first day"
}

variable "inspection_status_gather_queue_individual_message_delay_seconds_second_day_beyond" {
  type        = number
  description = "Inspection status gather queue individual messages delay in seconds for the second day and beyond"
}

variable "inspection_status_gather_queue_resend_message_days_threshold" {
  type        = number
  description = "Inspection status gather queue threashold limit in days to gather status update"
}

variable "PAYMENT_REGISTER_API_GATEWAY_STAGE_URL" {
  type        = string
  description = "Carbon payment register internal AWS API Gateway stage URL"
}

variable "NODE_ENV" {
  type        = string
  description = "standard NODE_ENV from Node.js"
}

variable "SENSEDIA_URL" {
  type        = string
  description = "Sensedia Gateway URL"
}

variable "SENSEDIACLOUD_URL" {
  type        = string
  description = "Sensedia cloud url for api integration"
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

variable "process_lambda_maximum_retry_attempts" {
  type        = number
  description = "Inspection status queue visibility timeout in seconds"
}

variable "check_inspection_request_queue_visibility_timeout_seconds" {
  type        = number
  description = "Minimum inspection queue visibility in seconds; effective value is at least six times lambda_timeout"
}

variable "check_inspection_request_queue_message_delay_seconds" {
  type        = number
  description = "Inspection status queue message delay in seconds"
}

variable "UP_TO_FIFTEEN_MINUTES" {
  type        = number
  description = "Time since creation up to 15 minutes"
}

variable "UP_TO_TWENTY_FOUR_HOURS" {
  type        = number
  description = "Time since creation up to 24 hours"
}

variable "MAX_LIMIT" {
  type        = number
  description = "Time since creation up to max limit"
}

variable "UP_TO_FIFTEEN_MINUTES_TTL" {
  type        = number
  description = "Ttl when time since creation is up to 15 minutes"
}

variable "UP_TO_TWENTY_FOUR_HOURS_TTL" {
  type        = number
  description = "Ttl when time since creation is up to 24 hours"
}

variable "MAX_LIMIT_TTL" {
  type        = number
  description = "Ttl when time since creation is up to max limit"
}

variable "INSPECTION_REQUEST_AUTO_DLQ_URL" {
  type        = string
  description = "Inspection request auto dlq url"
}