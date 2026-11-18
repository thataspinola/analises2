# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----

variable "layer_name" {
  type        = string
  description = "AWS Lambda Function Layer name"
  default     = "carbon-acq-service-order-request-common"
}

# ---- WITHOUT Default Value ----

variable "account_id" {
  type        = string
  description = "AWS account ID"
}