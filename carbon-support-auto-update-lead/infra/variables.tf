# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

# ---- WITH Default Value ----
variable "project_name" {
  type        = string
  description = "Project Name"
  default     = "carbon-support-auto-update-lead"
}

variable "AWS_REGION" {
  type        = string
  description = "AWS region"
  default     = "ca-central-1"
}

variable "token_layer_name" {
  type        = string
  description = "Token layer name"
  default     = "carbon_token_layer"
}

variable "inspection_request_lambda_role_name" {
  type        = string
  description = "Arn of Carbon Automobile Inspection Request lambda role name"
  default     = "carbon-inspection-request-auto-lambda-role"
}

variable "auto_quotation_lambda_role_name" {
  type        = string
  description = "Arn of Carbon Automobile Inspection Request lambda role name"
  default     = "carbon-acquisition-auto-quotation-lambda-role"
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

variable "dlq_message_retention_days" {
  type        = string
  description = "DLQ message rentention in days"
}

variable "queue_visibility_timeout_seconds" {
  type        = string
  description = "queue visibility timeout in seconds"
}

variable "CARBON_UPDATE_LEAD_API_GATEWAY_URL" {
  type        = string
  description = "Carbon update lead internal AWS API Gateway URL"
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
