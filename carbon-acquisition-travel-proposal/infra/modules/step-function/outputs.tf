# ----------------------------------------------------------------
# OUTPUTS
# ----------------------------------------------------------------

output "step_function_invoke_arn" {
  value = aws_sfn_state_machine.state_machine.arn
}
