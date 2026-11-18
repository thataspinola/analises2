# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----

# ---- WITHOUT Default Value ----

variable "queue_name" {
  type        = string
  description = "AWS SQS queue name"
}

variable "queue_arn" {
  type        = string
  description = "AWS SQS queue ARN"
}

variable "queue_url" {
  type        = string
  description = "AWS SQS queue URL"
}

variable "account_id" {
  type        = string
  description = "AWS account ID"
}

variable "lambda_role_arn" {
  type        = string
  description = "AWS IAM Role ARN used by AWS Lambda Function for consume AWS SQS queue messages"
}

