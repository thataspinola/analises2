# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----

variable "dynatrace_aws_lambda_exec_wrapper" {
  type        = string
  description = "dynatrace_aws_lambda_exec_wrapper"
  default     = "/opt/dynatrace"
}

variable "lambda_maximum_concurrency" {
  type        = number
  description = "AWS Lambda function (that will handle SQS messages received through SNS) maximum allowed concurrency"
  default     = 2
}

variable "service_order_layer_name" {
  type        = string
  description = "Carbon acquisiton service-order AWS Lambda Function Layer name"
  default     = "carbon-acq-service-order-layer"
}

variable "dead_letter_cloudwatch_metric_alarm_evaluation_periods_count" {
  type        = number
  description = "AWS SQS queue dead-letter AWS Cloudwatch metric alarm evaluation periods count"
  default     = 1
}

variable "carbon_postponed_payment_data_layer_name" {
  type        = string
  description = "Carbon payment posponed payment data AWS Lambda Function Layer name"
  default     = "carbon-postponed-payment-data"
}

variable "SENDGRID_API_ENDPOINT_PATH" {
  type        = string
  description = "API URL path for SendGrid 3rd party service"
  default     = "v3/mail/send"
}

variable "PORTOSERVICO_SERVICEORDER_MAIL_SENDER" {
  type        = string
  description = "Porto-serviço service-order mail sender address"
  default     = "comunicacao.portoservico@portoseguro.com.br"
}

variable "PORTOSERVICO_SERVICEORDER_MAIL_SENDER_NAME" {
  type        = string
  description = "Porto-serviço service-order mail sender name"
  default     = "Porto Serviço"
}

variable "PORTOSERVICO_SERVICEORDER_MAIL_FAILED_SUBJECT" {
  type        = string
  description = "Porto-serviço service-order successfully created mail subject"
  default     = "Orçamento de serviços"
}

variable "PORTOSERVICO_SERVICEORDER_MAIL_FAILED_TEMPLATEID" {
  type        = string
  description = "Porto-serviço service-order successfully created Sendgrid templateId"
  default     = "b57cad3d-63eb-4f8c-b7cd-85da7c492c35"
}

variable "carbon_serviceorder_payment_checkout_name" {
  type        = string
  description = "Carbon service-provision service-order payment checkout AWS Rest API name"
  default     = "carbon-payment-service-order-checkout"
}

variable "CARBON_SERVICE_ORDER_PAYMENT_CHECKOUT_API_ENDPOINT_PATH" {
  type        = string
  description = "Carbon service-provision service-order payment checkout url path"
  default     = "v1"
}

variable "aws_region" {
  type        = string
  default     = "ca-central-1"
  description = "Aws region"
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

variable "vpc_subnet_ids" {
  type = list(string)
}

variable "vpc_security_group_id" {
  type = list(string)
}

variable "vpce" {
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

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "dynatrace_oneAgent_layer_arn" {
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

variable "queue_message_visibility_timeout_seconds" {
  type        = number
  description = "AWS SQS queue message visibility timeout in seconds"
}

variable "queue_message_redrive_policy_max_receive_count" {
  type        = number
  description = "AWS SQS queue dead-letter message redrive policy max receive count"
}

variable "lambda_cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "dead_letter_message_retention_days" {
  type        = string
  description = "AWS SQS queue dead-letter message rentention in days"
}

variable "SENDGRID_API_URL" {
  type        = string
  description = "SendGrid 3rd party service API URL"
}

variable "FISCAL_COMPANY_CODE" {
  type        = number
  description = "FISCAL COMPANY CODE"
}

variable "lambda_max_memory_size" {
  type        = number
  default     = 512
  description = "Amount of memory in MB your Lambda Function can use at runtime"
}

variable "GOOGLE_APPOINTMENTS_CONVERSION_QUEUE_URL" {
  type        = string
  description = "Google appointment conversion queue url"
}
