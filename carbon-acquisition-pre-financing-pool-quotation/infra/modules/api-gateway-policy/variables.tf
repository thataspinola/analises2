# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

# ---- WITH Default Value ----
# ---- WITHOUT Default Value ----
variable "AWS_REGION" {
  type        = string
  description = "AWS Region"
}

variable "account_id" {
  type        = string
  description = "AWS account ID"
}

variable "api_gateway_id" {
  type        = string
  description = "AWS API Gateway Identifier"
}

variable "stage_name" {
  type        = string
  description = "Gateway API stage name"
}

variable "endpoint_http_method" {
  type        = string
  description = "API Gateway endpoint HTTP method"
}
