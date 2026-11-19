
resource "aws_cloudwatch_log_group" "log_group_for_sfn" {
  name              = "/aws/vendedlogs/states/${var.project_name}"
  retention_in_days = var.log_retention_in_days
}

# -----------------------------------------------------------------
# CREATE STATE MACHINE FOR STEP FUNCTION
# -----------------------------------------------------------------

resource "aws_sfn_state_machine" "state_machine" {
  name     = var.project_name
  role_arn = aws_iam_role.role.arn
  type     = "EXPRESS"
  definition = templatefile("${path.module}/step-function.json",
    {
      account_id             = var.account_id
      step_function_timeout  = var.step_function_timeout
      aws_region             = var.aws_region
      queue_name               = var.queue_name
  })
  tags = {
    Gateway = var.project_name
  }

  logging_configuration {
    log_destination        = "${aws_cloudwatch_log_group.log_group_for_sfn.arn}:*"
    include_execution_data = false
    level                  = var.log_level
  }
}

# -----------------------------------------------------------------
# ROLE & POLICIES
# -----------------------------------------------------------------

data "aws_iam_policy_document" "role_policy_doc" {
  version = "2012-10-17"
  statement {
    actions = ["sts:AssumeRole"]
    effect  = "Allow"
    sid     = ""
    principals {
      type        = "Service"
      identifiers = ["states.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "role" {
  name               = var.project_name
  assume_role_policy = data.aws_iam_policy_document.role_policy_doc.json
}

resource "aws_iam_role_policy_attachment" "policy_attachment_carbon_stepfunction_base_execution_policy" {
  role       = aws_iam_role.role.name
  policy_arn = "arn:aws:iam::${var.account_id}:policy/carbon_stepfunction_base_execution_policy"
}
