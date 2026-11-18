# -----------------------------------------------------------------
# OUTPUTS
# -----------------------------------------------------------------

output "execution_arn" {
  value = aws_api_gateway_rest_api.api_gateway.execution_arn
}

output "api_gateway_id" {
  value = aws_api_gateway_rest_api.api_gateway.id
}

output "root_resource_id" {
  value = aws_api_gateway_rest_api.api_gateway.root_resource_id
}

output "http_method" {
  value = aws_api_gateway_method.api_gateway_method.http_method
}
