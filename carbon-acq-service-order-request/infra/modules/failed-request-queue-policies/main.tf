

# ----------------------------------------------------------------
# SQS QUEUE DEAD-LETTER POLICY
# ----------------------------------------------------------------

resource "aws_sqs_queue_policy" "queue_policy" {
  queue_url = var.queue_url
  policy    = data.aws_iam_policy_document.queue_policy_doc.json
}
