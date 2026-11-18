# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

# ---- WITH Default Value ----

# ---- WITHOUT Default Value ----

variable "table_arn" {
  type        = string
  description = "Failed service-order request AWS DynamoDB table ARN"
}

variable "account_id" {
  type        = string
  description = "AWS account ID"
}
