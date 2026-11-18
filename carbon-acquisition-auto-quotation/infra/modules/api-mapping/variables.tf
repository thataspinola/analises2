# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

# ---- WITH Default Value ----
variable "api_custom_domain_path" {
  type        = string
  description = "API Gateway custom domain path"
  default     = "acquisition/auto/quotation"
}
# ---- WITHOUT Default Value ----

variable "api_custom_domain_fqn" {
  type        = string
  description = "API Gateway custom domain fully qualified name"
}

variable "api_gateway_id" {
  type        = string
  description = "API Rest Gateway ID"
}

variable "stage_name" {
  type        = string
  description = "API stage name"
}
