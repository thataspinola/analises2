# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

# ---- WITH Default Value ----
variable "project_name" {
  type        = string
  description = "Project Name"
  default     = "carbon-inspection-request-auto"
}

variable "dynamo_table_name" {
  type        = string
  description = "dynamo table name"
  default     = "carbon-postponed-payment-data"
}

variable "AWS_REGION" {
  type        = string
  description = "AWS region"
  default     = "ca-central-1"
}

variable "CHECK_INSPECTION_REQUEST_QUEUE_NAME" {
  type        = string
  description = "Carbon automobile inspection status process queue name"
  default     = "carbon-check-inspection-request-auto"
}

variable "UPDATE_LEAD_AUTO_QUEUE_NAME" {
  type        = string
  description = "Carbon automobile update lead process queue name"
  default     = "carbon-support-auto-update-lead"
}

variable "token_layer_name" {
  type        = string
  description = "Token layer name"
  default     = "carbon_token_layer"
}

variable "postponed_payment_data_name" {
  type        = string
  description = "Token layer name"
  default     = "carbon-postponed-payment-data"
}

variable "inspection_ready_sns_name" {
  type        = string
  description = "Inspection sns name from payments infra"
  default     = "carbon-inspection-ready"
}

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

variable "lambda_cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
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

variable "dlq_message_retention_days" {
  type        = string
  description = "DLQ message rentention in days"
}

variable "queue_visibility_timeout_seconds" {
  type        = string
  description = "queue visibility timeout in seconds"
}

variable "AUTO_INSURANCE_PAYMENT_NOT_READY_STATUS_VALUE" {
  type        = string
  description = "Status text value that indicates if payment is pending to be processed"
  default     = "PAGAMENTO NAO LIBERADO"
}

variable "VEHICLE_API_URL" {
  type        = string
  description = "Vehicle auto search internal AWS API Gateway URL"
}

variable "UPDATE_LEAD_API_URL" {
  type        = string
  description = "update lead internal AWS API Gateway URL"
}

variable "V1_AUTO_VEHICLE_SEARCH_ENDPOINT" {
  type        = string
  description = "v1 auto vehicle search endpoint path"
  default     = "v1/auto-vehicle-search"
}

variable "V1_UPDATE_LEAD_ENDPOINT" {
  type        = string
  description = "v1 update lead endpoint path"
  default     = "v1/update-lead"
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
