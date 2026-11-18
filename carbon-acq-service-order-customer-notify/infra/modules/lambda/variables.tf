# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----

# ---- WITHOUT Default Value ----
variable "function_name" {
  type        = string
  description = "AWS lambda function name"
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

variable "NODE_ENV" {
  type        = string
  description = "standard NODE_ENV from Node.js"
}

variable "SENDGRID_API_ENDPOINT_PATH" {
  type        = string
  description = "API Endpoint URL path for SendGrid 3rd party service"
}

variable "SENDGRID_API_URL" {
  type        = string
  description = "SendGrid 3rd party service API URL"
}

variable "timeout" {
  type        = number
  description = "AWS Lambda function execution timeout"
}

variable "max_memory_size" {
  type        = string
  description = "Amount of memory in MB your Lambda Function can use at runtime"
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

variable "carbon_acq_service_order_layer_name" {
  type        = string
  description = "Carbon acquisition service-order AWS Lambda Layer name"
}

variable "PORTOSERVICO_SENDGRID_AUTH_TOKEN" {
  type        = string
  description = "Porto-serviço Sendgrid 3rd party service authentication token"
}

variable "PORTOSERVICO_SERVICEORDER_MAIL_SENDER" {
  type        = string
  description = "Porto-serviço service-order mail sender address"
}

variable "PORTOSERVICO_SERVICEORDER_MAIL_SENDER_NAME" {
  type        = string
  description = "Porto-serviço service-order mail sender name"
}

variable "PORTOSERVICO_SERVICEORDER_MAIL_SUCCESS_SUBJECT" {
  type        = string
  description = "Porto-serviço service-order successfully created mail subject"
}

variable "PORTOSERVICO_SERVICEORDER_MAIL_SUCCESS_TEMPLATEID" {
  type        = string
  description = "Porto-serviço service-order successfully created Sendgrid templateId"
}

variable "PORTOSERVICO_SERVICEORDER_MAIL_SUCCESS_TEMPLATEID_PIX" {
  type        = string
  description = "Porto-serviço service-order successfully created Sendgrid templateId (PIX payment)"
}