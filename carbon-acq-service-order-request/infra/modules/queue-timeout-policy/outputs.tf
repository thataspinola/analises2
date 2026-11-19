output "visibility_timeout_seconds" {
  description = "Validated queue visibility timeout; current consumers have no batching window."
  value       = var.visibility_timeout_seconds

  precondition {
    condition     = var.visibility_timeout_seconds >= 6 * var.lambda_timeout_seconds
    error_message = "SQS visibility timeout must be at least six times the consuming Lambda timeout. If a batching window is added, include it in this policy."
  }
}
