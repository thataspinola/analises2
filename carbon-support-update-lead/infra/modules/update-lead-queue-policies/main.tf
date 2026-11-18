# ----------------------------------------------------------------
# SQS QUEUE POLICY
# ----------------------------------------------------------------

resource "aws_sqs_queue_policy" "queue_policy" {
  queue_url = var.queue_id
  policy    = data.aws_iam_policy_document.queue_policy_doc.json
}

resource "aws_iam_policy" "sqs_api_role_policy" {
  policy = data.aws_iam_policy_document.api_gateway_policy_doc.json
}

resource "aws_iam_role_policy_attachment" "sqs_api_role_attachment" {
  role       = var.api_gateway_role_name
  policy_arn = aws_iam_policy.sqs_api_role_policy.arn
  depends_on = [aws_iam_policy.sqs_api_role_policy]
}
