# -----------------------------------------------------------------
# OUTPUTS
# -----------------------------------------------------------------

output "lambda_invoke_arn" {
  value = aws_lambda_function.lambda.invoke_arn
}

output "lambda_role_arn" {
  value = aws_iam_role.lambda_role.arn
}

output "lambda_function_name" {
  value = aws_lambda_function.lambda.function_name
}

output "lambda_role_name" {
  value = aws_iam_role.lambda_role.name
}