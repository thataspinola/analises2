# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----

# ---- WITHOUT Default Value ----

variable "sns_topic_arn" {
  type        = string
  description = "AWS SNS Topic (that will feed queue messages) ARN"
}

variable "queue_arn" {
  type        = string
  description = "AWS SQS queue ARN"
}