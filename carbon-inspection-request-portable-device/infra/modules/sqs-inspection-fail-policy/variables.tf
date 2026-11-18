# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------
variable "project_name" {
  type        = string
  description = "Project name ready to use in the resouse"
}

variable "lambda_role_arn" {
  type        = string
  description = "Inspaction lambda role arn"
}

variable "sqs_inepection_request_arn" {
  type        = string
  description = "Inspection Request SQS Arn"
}

variable "sqs_inepection_fail_arn" {
  type        = string
  description = "Inspection Fail SQS Arn"
}

variable "dlq_inepection_fail_arn" {
  type        = string
  description = "Inspection Fail DLQ Arn"
}

variable "sqs_inepection_fail_id" {
  type        = string
  description = "Inspection Fail SQS ID"
}

variable "dlq_inepection_fail_id" {
  type        = string
  description = "Inspection Fail DLQ ID"
}
