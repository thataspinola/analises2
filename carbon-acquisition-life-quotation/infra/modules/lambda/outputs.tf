# -----------------------------------------------------------------
# OUTPUTS
# -----------------------------------------------------------------

output "lambda_arn" {
  value = aws_lambda_function.lambda_quotation.arn
}

output "lambda_invoke_arn" {
  value = aws_lambda_function.lambda_quotation.invoke_arn
}

output "lambda_role_arn" {
  value = aws_iam_role.lambda_role.arn
}

output "lambda_function_name" {
  value = aws_lambda_function.lambda_quotation.function_name
}