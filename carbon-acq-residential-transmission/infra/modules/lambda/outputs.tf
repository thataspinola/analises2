# -----------------------------------------------------------------
# OUTPUTS
# -----------------------------------------------------------------

output "carbon_acquisition_transmission_lambda_invoke_arn" {
  value = aws_lambda_function.carbon_acquisition_transmission_lambda.invoke_arn
}