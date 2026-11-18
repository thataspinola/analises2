# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

variable "visibility_timeout_seconds" {
  type        = number
  nullable    = false
  description = "OTP sender queue visibility timeout in seconds"

  validation {
    condition     = var.visibility_timeout_seconds >= 0 && var.visibility_timeout_seconds <= 43200 && floor(var.visibility_timeout_seconds) == var.visibility_timeout_seconds
    error_message = "Queue visibility timeout must be an integer between 0 and 43200 seconds."
  }
}

variable "lambda_timeout_seconds" {
  type        = number
  nullable    = false
  description = "Timeout of the OTP sender Lambda in seconds"

  validation {
    condition     = var.lambda_timeout_seconds >= 1 && var.lambda_timeout_seconds <= 900 && floor(var.lambda_timeout_seconds) == var.lambda_timeout_seconds
    error_message = "OTP sender Lambda timeout must be an integer between 1 and 900 seconds."
  }
}
