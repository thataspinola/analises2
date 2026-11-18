# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----

# ---- WITHOUT Default Value ----
variable "queue_name" {
  type        = string
  description = "AWS SQS queue name"
}

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