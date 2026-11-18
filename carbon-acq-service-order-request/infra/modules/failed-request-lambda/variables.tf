# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----

variable "function_name" {
  type        = string
  description = "AWS lambda function name"
  default     = "carbon-acq-service-order-failed-request"
}

# ---- WITHOUT Default Value ----

variable "account_id" {
  type        = string
  description = "AWS account ID"
}

variable "token_layer_name" {
  type        = string
  description = "Token layer name"
}

variable "common_layer_name" {
  type        = string
  description = "Carbon payment Service-Order common AWS Lambda Function Layer name"
}

variable "postponed_payment_data_layer_name" {
  type        = string
  description = "Carbon payment posponed payment data AWS Lambda Function Layer name"
}

variable "service_order_layer_name" {
  type        = string
  description = "Carbon acquisiton service-order AWS Lambda Function Layer name"
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

variable "API_PATH" {
  type        = string
  description = "API PATH"
}

variable "SENSEDIA_URL" {
  type        = string
  description = "Sensedia url for api integration"
}

variable "SENSEDIA_CLOUD_URL" {
  type        = string
  description = "Sensedia (cloud) url for api integration"
}

variable "timeout" {
  type        = number
  description = "AWS Lambda function execution timeout"
}

variable "cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "dynatrace_oneAgent_layer_arn" {
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

variable "FAILED_REQUEST_TABLE_NAME" {
  type        = string
  description = "Failed service-order request AWS DynamoDB table name"
}

variable "SENDGRID_API_ENDPOINT_PATH" {
  type        = string
  description = "API Endpoint URL path for SendGrid 3rd party service"
}

variable "SENDGRID_API_URL" {
  type        = string
  description = "SendGrid 3rd party service API URL"
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

variable "PORTOSERVICO_SERVICEORDER_MAIL_FAILED_SUBJECT" {
  type        = string
  description = "Porto-serviço service-order successfully created mail subject"
}

variable "PORTOSERVICO_SERVICEORDER_MAIL_FAILED_TEMPLATEID" {
  type        = string
  description = "Porto-serviço service-order successfully created Sendgrid templateId"
}

variable "CARBON_SERVICE_ORDER_PAYMENT_CHECKOUT_API_URL" {
  type        = string
  description = "Carbon service-provision service-order checkout URL"
}

variable "CARBON_SERVICE_ORDER_PAYMENT_CHECKOUT_API_ENDPOINT_PATH" {
  type        = string
  description = "Carbon service-provision service-order checkout URL path"
}

variable "max_memory_size" {
  type        = string
  description = "Amount of memory in MB your Lambda Function can use at runtime"
}
