# ----------------------------------------------------------------
# SQS POLICY DOCUMENTS
# ----------------------------------------------------------------

data "aws_iam_policy_document" "queue_fedusers_policy_doc" {
  statement {
    sid       = "carbon-acq-pre-financing-pool-direct-contact-requests-sqs-fedusers-policy-doc"
    resources = ["${var.contact_requests_queue_arn}"]
    actions = [
      "sqs:GetQueueAttributes",
      "sqs:GetQueueUrl",
      "sqs:ListQueueTags",
      "sqs:SendMessage",
      "sqs:ChangeMessageVisibility",
      "sqs:DeleteMessage",
      "sqs:ReceiveMessage"
    ]
    principals {
      type        = "Federated"
      identifiers = ["*"]
    }
  }
}

data "aws_iam_policy_document" "queue_producer_policy_doc" {
  statement {
    sid       = "carbon-acq-pre-financing-pool-direct-contact-requests-sqs-producer-policy-doc"
    resources = ["${var.contact_requests_queue_arn}"]
    actions = [
      "sqs:GetQueueAttributes",
      "sqs:GetQueueUrl",
      "sqs:ListQueueTags",
      "sqs:SendMessage",
    ]
    principals {
      type = "AWS"
      identifiers = [
        "${var.request_lambda_role_arn}"
      ]
    }
  }
}

data "aws_iam_policy_document" "queue_consumer_policy_doc" {
  statement {
    sid       = "carbon-acq-pre-financing-pool-direct-contact-requests-sqs-consumer-policy-doc"
    resources = ["${var.contact_requests_queue_arn}"]
    actions = [
      "sqs:GetQueueAttributes",
      "sqs:GetQueueUrl",
      "sqs:ListQueueTags",
      "sqs:ChangeMessageVisibility",
      "sqs:DeleteMessage",
      "sqs:ReceiveMessage"
    ]
    principals {
      type = "AWS"
      identifiers = [
        "${var.process_lambda_role_arn}"
      ]
    }
  }
}

data "aws_iam_policy_document" "queue_queue_policy_doc" {
  source_policy_documents = [
    data.aws_iam_policy_document.queue_fedusers_policy_doc.json,
    data.aws_iam_policy_document.queue_producer_policy_doc.json,
    data.aws_iam_policy_document.queue_consumer_policy_doc.json
  ]
}

# ----------------------------------------------------------------
# SQS QUEUE POLICY
# ----------------------------------------------------------------

resource "aws_sqs_queue_policy" "queue_policy" {
  queue_url = var.contact_requests_queue_url
  policy    = data.aws_iam_policy_document.queue_queue_policy_doc.json
}
