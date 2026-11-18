# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

# ---- WITH Default Value ----

# ---- WITHOUT Default Value ----

variable "carbon_lead_in_progress_db_table_arn" {
  type        = string
  description = "Arn of store leads dynamoDB table"
}

variable "carbon_lead_in_progress_db_table_name" {
  type        = string
  description = "Dynamodb table name responsible for storing leads"
}

variable "carbon_lead_in_progress_db_table_stream_arn" {
  type        = string
  description = "Arn of lead in progress dynamoDB table stream"
}

variable "lambda_producer_role_name" {
  type        = string
  description = "Name of Carbon lambda role"
}

variable "lambda_producer_function_name" {
  type        = string
  description = "Carbon lambda function name"
}

variable "lambda_consumer_role_name" {
  type        = string
  description = "Name of Carbon lambda role"
}

variable "lambda_consumer_function_name" {
  type        = string
  description = "Carbon lambda function name"
}
