# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

# ---- WITH Default Value ----

variable "table_name" {
  type        = string
  description = "Status gather queue schedule dynamoDB table name"
  default     = "inspection-request-auto-gather-schedule"
}

# ---- WITHOUT Default Value ----
