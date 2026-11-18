# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

# ---- WITH Default Value ----

# ---- WITHOUT Default Value ----

variable "inspection_request_lambda_role_arn" {
  type        = string
  description = "Arn of Carbon Automobile Inspection Request lambda role"
}

variable "check_inspection_request_lambda_role_arn" {
  type        = string
  description = "Arn of Carbon Automobile Check Inspection Request lambda role"
}

variable "check_inspection_request_queue_arn" {
  type        = string
  description = "Url of AWS SQS queue for Carbon Automobile Check Inspection Request"
}

variable "check_inspection_request_queue_url" {
  type        = string
  description = "URL of AWS SQS queue for Carbon Automobile Check Inspection Request"
}

variable "check_inspection_request_dlq_queue_arn" {
  type        = string
  description = "Url of AWS Dlq SQS queue for Carbon Automobile Check Inspection Request"
}

variable "check_inspection_request_dlq_queue_url" {
  type        = string
  description = "URL of AWS DLQ SQS queue for Carbon Automobile Check Inspection Request"
}
