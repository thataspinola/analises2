# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

# ---- WITH Default Value ----
variable "aws_region" {
  type        = string
  default     = "ca-central-1"
  description = "Aws region"
}

variable "project_base_name" {
  type        = string
  default     = "carbon-inspection"
  description = "Project name"
}

variable "token_lambda_layer_name" {
  type        = string
  default     = "carbon_token_layer"
  description = "Token layer name"
}

variable "postponed_payment_data_name" {
  type        = string
  default     = "carbon-postponed-payment-data"
  description = "Payment layer name"
}

variable "dynamo_table_name" {
  type        = string
  default     = "carbon-postponed-payment-data"
  description = "Payment Data Dynamo Table Name"
}

variable "inspection_ready_sns_name" {
  type        = string
  description = "Inspection sns name from payments infra"
  default     = "carbon-inspection-ready"
}

variable "google_analytics_queue_name" {
  type        = string
  description = "Carbon service connector google analytics queue name"
  default     = "carbon-service-connector-google-analytics-collect"
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

variable "lambda_cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "request_lambda_timeout" {
  type        = number
  description = "Lambda Request Inspection Timeout"
}

variable "fail_lambda_timeout" {
  type        = number
  description = "Lambda Fail Inspection Timeout"
}

variable "NODE_ENV" {
  type        = string
  description = "Standard NODE_ENV from Node.js"
}

variable "MULE_URL" {
  type        = string
  description = "Mule url for api integration"
}

variable "INTERNAL_GTW_EMAIL_NOTIFICATION_URL" {
  type        = string
  description = "Url do fluxo interno de notificação de e-mail"
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
