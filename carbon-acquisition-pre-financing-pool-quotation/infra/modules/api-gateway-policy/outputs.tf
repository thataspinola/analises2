# -----------------------------------------------------------------
# OUTPUTS
# -----------------------------------------------------------------

output "rest_api_policy_json" {
  value = aws_api_gateway_rest_api_policy.api_gateway_policy.policy
}
