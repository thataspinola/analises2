# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----

variable "queue_name" {
  type        = string
  description = "AWS SQS queue name"
  default     = "carbon-acq-service-order-failed-request"
}
variable "cloudwatch_metric_alarm_period_length" {
  type        = number
  description = "AWS SQS queue dead-letter Cloudwatch metric alarm evaluation periods count"
  default     = 600
}

variable "cloudwatch_metric_alarm_threshold" {
  type        = number
  description = "AWS SQS queue dead-letter Cloudwatch metric alarm evaluation periods count"
  default     = 20
}

# ---- WITHOUT Default Value ----

variable "message_visibility_timeout_seconds" {
  type        = number
  description = "AWS SQS dead-letter message visibility timeout in seconds"
}

variable "message_retention_days" {
  type        = number
  description = "AWS SQS dead-letter message rentention in days"
}

variable "cloudwatch_metric_alarm_evaluation_periods_count" {
  type        = number
  description = "AWS SQS queue dead-letter Cloudwatch metric alarm evaluation periods count"
}
