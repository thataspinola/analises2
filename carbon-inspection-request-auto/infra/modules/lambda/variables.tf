
# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------
variable "project_name" {
  type        = string
  description = "Project Name"
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

variable "lambda_cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "token_layer_name" {
  type        = string
  default     = "carbon_token_layer"
  description = "Token layer name"
}

variable "postponed_payment_data_name" {
  type        = string
  description = "Pagamentos Data layer name"
}

variable "NODE_ENV" {
  type        = string
  description = "standard NODE_ENV from Node.js"
}

variable "SENSEDIA_URL" {
  type        = string
  description = "url sensedia api"
}

variable "SENSEDIACLOUD_URL" {
  type        = string
  description = "Sensedia cloud url for api integration"
}

variable "dynamodb_table_arn" {
  type        = string
  description = "dynamodb table name"
}

variable "CHECK_INSPECTION_REQUEST_QUEUE_URL" {
  type        = string
  description = "Carbon automobile check inspection request queue URL"
}

variable "AUTO_INSURANCE_PAYMENT_NOT_READY_STATUS_VALUE" {
  type        = string
  description = "Status text value that indicates if payment is pending to be processed"
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
}

variable "V1_UPDATE_LEAD_ENDPOINT" {
  type        = string
  description = "v1 update lead endpoint path"
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
