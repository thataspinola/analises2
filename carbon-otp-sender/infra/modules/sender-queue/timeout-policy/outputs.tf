output "visibility_timeout_seconds" {
  description = "Visibility timeout validated against the OTP sender Lambda timeout"
  value       = var.visibility_timeout_seconds

  precondition {
    condition     = var.visibility_timeout_seconds >= 6 * var.lambda_timeout_seconds
    error_message = "OTP sender queue visibility timeout must be at least six times the sender Lambda timeout. The current mapping uses batch_size = 1 with no batching window."
  }
}
