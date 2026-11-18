# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------
variable "project_name" {
  type        = string
  description = "Project name ready to use in the resouse"
}

variable "lambda_name" {
  type        = string
  description = "Nome da Lambda que irá realizar o trigger"
}

variable "inspection_ready_sns_arn" {
  type        = string
  description = "Inspection Ready SNS Arn"
}

variable "request_fail_sqs_arn" {
  type        = string
  description = "Inspection Fail SQS Arn"
}

variable "dlq_message_retention_days" {
  type        = string
  description = "DLQ message rentention in days"
}
