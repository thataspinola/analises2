# ----------------------------------------------------------------
# OUTPUTS
# ----------------------------------------------------------------

output "step_functions_iam_role" {
  value = aws_iam_role.step_functions_iam_role.arn
}