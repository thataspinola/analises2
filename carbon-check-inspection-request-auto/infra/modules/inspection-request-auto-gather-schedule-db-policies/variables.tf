# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

# ---- WITH Default Value ----

# ---- WITHOUT Default Value ----

variable "inspection_request_auto_gather_schedule_db_table_arn" {
  type        = string
  description = "Arn of Status gather queue schedule dynamoDB table"
}

variable "inspection_request_auto_gather_schedule_db_table_stream_arn" {
  type        = string
  description = "Arn of Status gather queue schedule dynamoDB table stream"
}

variable "inspection_request_auto_gather_schedule_db_table_name" {
  type        = string
  description = "Status gather queue schedule dynamoDB table name"
}

variable "check_inspection_request_lambda_role_name" {
  type        = string
  description = "Name of Carbon Automobile Check Inspection Request lambda role"
}

variable "check_inspection_request_lambda_function_name" {
  type        = string
  description = "Carbon Automobile Check Inspection Request lambda function name"
}