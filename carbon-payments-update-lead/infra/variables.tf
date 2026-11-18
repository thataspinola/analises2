# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----
variable "aws_region" {
  type        = string
  default     = "ca-central-1"
  description = "Aws region"
}

variable "project_name" {
  type        = string
  description = "project name"
  default     = "carbon-payments-update-lead"
}

variable "token_lambda_layer_name" {
  type        = string
  default     = "carbon_token_layer"
  description = "Token layer name"
}

variable "default_batch_size" {
  type        = number
  description = "Tamanho padrão do tamanho de batch de uma trigger"
  default     = 10
}

variable "default_maximum_concurrency" {
  type        = number
  description = "Tamanho padrão do maior número de concorrência de uma Lambda"
  default     = 5
}

variable "dynatrace_aws_lambda_exec_wrapper" {
  type        = string
  description = "dynatrace_aws_lambda_exec_wrapper"
  default     = "/opt/dynatrace"
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

variable "NODE_ENV" {
  type        = string
  description = "Standard NODE_ENV from Node.js"
}

variable "CARBON_INTERNAL_GATEWAY_URL" {
  type        = string
  description = "Internal Gateway URL"
}

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "dlq_message_retention_days" {
  type        = string
  description = "DLQ message rentention in days"
}

variable "queue_visibility_timeout_seconds" {
  type        = string
  description = "queue visibility timeout in seconds"
}

variable "max_retry_lambda" {
  type        = number
  description = "Máximo de tentativas antes de enviar para DLQ"
}

variable "approved_payments_sns_name" {
  type        = string
  description = "Approved payments sns name from payments infra"
}

variable "rejected_payments_sns_name" {
  type        = string
  description = "Reproved payments sns name from payments infra"
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
