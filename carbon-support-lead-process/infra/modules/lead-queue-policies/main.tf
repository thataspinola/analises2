# ----------------------------------------------------------------
# SQS QUEUE POLICY
# ----------------------------------------------------------------

resource "aws_sqs_queue_policy" "queue_policy" {
  queue_url = var.lead_queue_url
  policy    = data.aws_iam_policy_document.queue_queue_policy_doc.json
}
