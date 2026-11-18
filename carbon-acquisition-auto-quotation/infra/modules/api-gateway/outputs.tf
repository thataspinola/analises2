# -----------------------------------------------------------------
# OUTPUTS
# -----------------------------------------------------------------

output "api_gateway_execution_arn" {
  value = aws_api_gateway_rest_api.api_gateway.execution_arn
}

output "api_gateway_id" {
  value = aws_api_gateway_rest_api.api_gateway.id
}

output "stage_name" {
  value = aws_api_gateway_stage.api_gateway_stage.stage_name
}

output "http_method" {
  value = aws_api_gateway_method.api_gateway_method.http_method
}

