# ----------------------------------------------------------------
# SQS QUEUE DEAD-LETTER POLICY
# ----------------------------------------------------------------

resource "aws_sqs_queue_policy" "queue_dead_letter_policy" {
  queue_url = var.queue_dead_letter_url
  policy    = data.aws_iam_policy_document.queue_dead_letter_policy_doc.json
}
