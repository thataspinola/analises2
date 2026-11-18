
# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------
variable "project_name" {
  type        = string
  description = "Project name ready to use in the resouse"
}

variable "account_id" {
  type        = string
  description = "AWS account ID"
}

variable "vpc_subnet_ids" {
  type        = list(string)
  description = "VPC ids to use on resourse"
}

variable "vpc_security_group_id" {
  type        = list(string)
  description = "VPC security to use on resourse"
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
  description = "Standard NODE_ENV from Node.js"
}

variable "MULE_URL" {
  type        = string
  description = "Mule url for api integration"
}

variable "token_lambda_layer_name" {
  type        = string
  description = "Token layer name"
}

variable "postponed_payment_data_name" {
  type        = string
  description = "Payment Data recovery layer name"
}

variable "dynamodb_table_arn" {
  type        = string
  description = "Arn of Dynamodb of Payment Data layer for permitions configuration"
}

variable "GOOGLE_ANALYTICS_COLLECT_QUEUE_URL" {
  type        = string
  description = "Carbon service connector google analytics queue URL"
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
