
# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

variable "account_id" {
  type        = string
  description = "AWS account ID"
}

variable "project_name" {
  type        = string
  description = "Nome do Projeto"
}

variable "vpc_subnet_ids" {
  type = list(string)
}

variable "vpc_security_groups_ids" {
  type = list(string)
}

variable "token_layer_name" {
  type        = string
  description = "Token layer name"
}

variable "postponed_payment_data_name" {
  type        = string
  description = "Token layer name"
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

variable "COMMERCE_URL" {
  type        = string
  description = "Commerce URL"
}

variable "MULESOFT_URL" {
  type        = string
  description = "Gateway MULESOFT URL"
}

variable "SALESFORCE_EMAIL_SENDER_QUEUE" {
  type        = string
  description = "Fila para envio de email"
}

variable "dynamodb_table_arn" {
  type        = string
  description = "ARN da tabela onde serão salvo os erros"
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