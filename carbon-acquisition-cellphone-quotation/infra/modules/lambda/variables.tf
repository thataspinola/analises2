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

variable "EMPLOYEE_SUSEP" {
  type        = string
  description = "susep employee"
}

variable "COUPON_API_URL" {
  type        = string
  description = "COUPON API URL"
}

variable "MULESOFT_URL" {
  type        = string
  description = "Mulesoft Gateway URL"
}

variable "CARBON_QUEUE_URL" {
  type        = string
  description = "Carbon queue URL"
}

variable "CHANNEL_CODE_COUPON_AUTO_APPLY" {
  type        = string
  description = "Feature flag channelCode "
}

variable "WAITING_TIME_TO_GET_QUOTATION_IN_MILLISECONDS" {
  type        = number
  description = "waiting time to get quotation in milliseconds"
}

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "MAX_TIME_PROCESS_QUOTATION" {
  type        = number
  description = "max time to retry get quotation"
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

variable "DENY_LEAD_QUEUE_URL" {
  type        = string
  description = "Deny lead SQS queue URL"
}