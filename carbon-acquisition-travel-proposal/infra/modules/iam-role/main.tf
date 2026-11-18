# -----------------------------------------------------------------
# STEP-FUNCTIONS ROLE & POLICIES
# -----------------------------------------------------------------

resource "aws_iam_role" "step_functions_iam_role" {
  name = "${var.project_name}_step_functions_iam_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = [
            "states.amazonaws.com",
            "apigateway.amazonaws.com"
          ]
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "policy_attachment_carbon_stepfunction_base_execution_policy" {
  role       = aws_iam_role.step_functions_iam_role.name
  policy_arn = "arn:aws:iam::${var.account_id}:policy/carbon_stepfunction_base_execution_policy"
}
