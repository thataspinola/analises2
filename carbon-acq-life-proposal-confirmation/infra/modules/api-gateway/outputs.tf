# -----------------------------------------------------------------
# OUTPUTS
# -----------------------------------------------------------------

output "execution_arn" {
  value = aws_api_gateway_rest_api.api_gateway.execution_arn
}
output "stage_name" {
  value = aws_api_gateway_stage.api_gateway_stage.stage_name
}
output "api_gateway_id" {
  value = aws_api_gateway_rest_api.api_gateway.id
}
