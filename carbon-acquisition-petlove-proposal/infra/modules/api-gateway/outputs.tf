# -----------------------------------------------------------------
# OUTPUTS
# -----------------------------------------------------------------

output "api_gateway_execution_arn" {
  value = aws_api_gateway_rest_api.api_gateway.execution_arn
}

output "api_gateway_id" {
  value = aws_api_gateway_rest_api.api_gateway.id
}
