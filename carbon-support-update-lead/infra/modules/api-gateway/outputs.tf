# -----------------------------------------------------------------
# OUTPUTS
# -----------------------------------------------------------------

output "deployment_execution_arn" {
  value = aws_api_gateway_rest_api.api_gateway.execution_arn
}

output "api_gateway_role_name" {
  value = aws_iam_role.api_gateway_role.name

}
output "stage_name" {
  value = aws_api_gateway_stage.api_gateway_stage.stage_name
}
output "api_gateway_id" {
  value = aws_api_gateway_rest_api.api_gateway.id
}
