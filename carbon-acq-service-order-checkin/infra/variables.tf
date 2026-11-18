# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----
variable "dynatrace_aws_lambda_exec_wrapper" {
  type        = string
  description = "dynatrace_aws_lambda_exec_wrapper"
  default     = "/opt/dynatrace"
}

variable "dead_letter_cloudwatch_metric_alarm_evaluation_periods_count" {
  type        = number
  description = "AWS SQS queue dead-letter Cloudwatch metric alarm evaluation periods count"
  default     = 1
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

variable "queue_message_processing_batch_size" {
  type        = number
  description = "AWS SQS (feeded by SNS) queue message processing batch size"
  default     = 1
}

variable "sns_topic_feed_name" {
  type        = string
  description = "SNS topic that will feed AWS SQS queue"
  default     = "carbon-acq-service-order-requested"
}

variable "lambda_max_memory_size" {
  type        = number
  default     = 512
  description = "Amount of memory in MB your Lambda Function can use at runtime"
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

variable "NODE_ENV" {
  type        = string
  description = "standard NODE_ENV from Node.js"
}

variable "MULESOFT_URL" {
  type        = string
  description = "Porto Mulesoft API Gateway URL"
}

variable "PORTOASSISTENCIA_ENDPOINT_PATH" {
  type        = string
  description = "Sensedia url for api integration"
}

variable "SENSEDIA_CLOUD_URL" {
  type        = string
  description = "Sensedia (cloud) url for api integration"
}

variable "TENANT_ID_PORTOASSISTENCIA_MULESOFT" {
  type        = string
  description = "Tenant id for oschassi api"
}

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "lambda_cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "queue_dead_letter_message_retention_days" {
  type        = string
  description = "AWS Queue Dead-Letter message rentention in days"
}

variable "queue_visibility_timeout_seconds" {
  type        = number
  description = "queue visibility timeout in seconds"
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
