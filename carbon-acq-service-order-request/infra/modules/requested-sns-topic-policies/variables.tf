# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----

# ---- WITHOUT Default Value ----
variable "topic_arn" {
  type        = string
  description = "AWS SNS Topic ARN"
}

variable "account_id" {
  type        = string
  description = "AWS account ID"
}