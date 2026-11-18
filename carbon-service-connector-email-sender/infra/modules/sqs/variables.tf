variable "project_name" {
  type        = string
  description = "project name"
}

variable "process_lambda_role_arn" {
  type        = string
  description = "Arn of process lambda role"
}

variable "dlq_message_retention_days" {
  type        = string
  description = "DLQ message rentention in days"
}

variable "visibility_timeout_seconds" {
  type        = string
  description = "queue visibility timeout in seconds"
}

variable "account_id" {
  type        = string
  description = "AWS account ID"
}
