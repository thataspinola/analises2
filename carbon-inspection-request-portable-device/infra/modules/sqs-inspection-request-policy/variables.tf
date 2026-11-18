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

variable "inspection_ready_sns_arn" {
  type        = string
  description = "Inspection Ready SNS Arn"
}

variable "producer_inpection_fail_lambda_role_arn" {
  type        = string
  description = "Inspection Fail Lambda Role Arn"
}

variable "dlq_inepection_request_arn" {
  type        = string
  description = "Inspection Request DLQ Arn"
}

variable "sqs_inepection_request_arn" {
  type        = string
  description = "Inspection Request SQS Arn"
}

variable "sqs_inepection_request_id" {
  type        = string
  description = "Inspection Request SQS ID"
}

variable "dlq_inepection_request_id" {
  type        = string
  description = "Inspection Request DLQ ID"
}
