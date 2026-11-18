

# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

# ---- WITH Default Value ----

variable "table_name" {
  type        = string
  description = "Failed service-order request AWS DynamoDB table name"
  default     = "carbon-acq-service-order-failed-request"
}

# ---- WITHOUT Default Value ----
