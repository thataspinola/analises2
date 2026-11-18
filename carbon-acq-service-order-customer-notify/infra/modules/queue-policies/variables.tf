# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----

# ---- WITHOUT Default Value ----
variable "queue_name" {
  type        = string
  description = "AWS SQS queue name"
}

variable "consumer_lambda_role_arn" {
  type        = string
  description = "AWS lambda function (that will consume queue messages) IAM role ARN"
}

variable "producer_sns_topic_arn" {
  type        = string
  description = "AWS SNS Topic (that will feed queue messages) ARN"
}

variable "queue_arn" {
  type        = string
  description = "AWS SQS queue ARN"
}

variable "queue_url" {
  type        = string
  description = "AWS SQS queue URL"
}