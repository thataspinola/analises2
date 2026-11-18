# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

# ---- WITH Default Value ----
variable "project_base_name" {
  type        = string
  default     = "carbon-inspection"
  description = "Project name"
}

variable "aws_region" {
  type        = string
  default     = "ca-central-1"
  description = "Aws region"
}

variable "carbon_token_layer_name" {
  type        = string
  description = "Hub de Vendas Carbon AWS Lambda layer name"
  default     = "carbon_token_layer"
}

variable "postponed_payment_data_name" {
  type        = string
  description = "Payment layer name"
  default     = "carbon-postponed-payment-data"
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

variable "is_poc" {
  type        = bool
  description = "Indicates if the current server is proof of concept aimed (That lambda and related resources will not access coorporative network and internet)"
  default     = false
}

variable "lambda_vpc_security_group_name" {
  type        = string
  description = "Name of AWS VPC Security group that will be set in AWS lambda functions"
  default     = "security-group-hub-vendas-token-redis"
}

variable "vpc_subnet_name_tag_value_list" {
  type        = list(string)
  description = "List of name tag value of subnets that will be set in AWS lambda functions"
  default = [
    "portocom-priv-subnet-az1",
    "portocom-priv-subnet-az2",
    "portocom-priv-subnet-az4"
  ]
}

variable "lambda_max_memory_size" {
  type        = number
  default     = 512
  description = "Amount of memory in MB your Lambda Function can use at runtime"
}

variable "dynatrace_aws_lambda_exec_wrapper" {
  type        = string
  description = "dynatrace_aws_lambda_exec_wrapper"
  default     = "/opt/dynatrace"
}

variable "TWISTLOCK_DISABLED" {
  type        = bool
  description = "Indicates if Palo Alto Networks Defender Serverless need to be disabled"
  default     = false
}

variable "ENABLE_APP_DEBUG" {
  type        = bool
  description = "Enables adittional logging for debugging purposes"
  default     = true
}

# ---- WITHOUT Default Value ----
variable "vpc_id" {
  type        = string
  description = "AWS VPC ID"
}

variable "cloudwatch_log_retention" {
  type        = number
  description = "Cloudwatch log retention in days"
}

variable "request_lambda_timeout" {
  type        = number
  description = "Lambda Request Inspection Timeout"
}

variable "fail_lambda_timeout" {
  type        = number
  description = "Lambda Fail Inspection Timeout"
}

variable "dynatrace_oneAgent_layer_arn" {
  type        = string
  description = "arn da layer do one agent do dynatrace"
}

variable "twistlock_layer_arn" {
  type        = string
  description = "arn da layer do twistlock"
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

variable "TWISTLOCK_POLICY" {
  type        = string
  description = "Palo Alto Networks Defender Serverless policy"
}

variable "NODE_ENV" {
  type        = string
  description = "standard NODE_ENV from Node.js"
}

variable "MULESOFT_URL" {
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
