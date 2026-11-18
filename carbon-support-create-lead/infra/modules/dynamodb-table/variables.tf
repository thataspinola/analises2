# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

# ---- WITH Default Value ----

variable "table_name" {
  type        = string
  description = "Dynamodb table name responsible for storing leads in progress"
  default     = "carbon-lead-in-progress"
}

# ---- WITHOUT Default Value ----
