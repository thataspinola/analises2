# ----------------------------------------------------------------
# SQS QUEUE DEAD-LETTER POLICY DOCUMENTS
# ----------------------------------------------------------------

data "aws_iam_policy_document" "queue_fedusers_policy_doc" {
  statement {
    sid       = "${var.queue_name}-sqs-fedusers-policy-doc"
    resources = [var.queue_arn]
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

data "aws_iam_policy_document" "queue_consumer_policy_doc" {
  statement {
    sid       = "${var.queue_name}-sqs-consumer-policy-doc"
    resources = ["${var.queue_arn}"]
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
        "${var.lambda_role_arn}"
      ]
    }
  }
}

data "aws_iam_policy_document" "queue_dead_letter_queue_policy_doc" {
  statement {
    sid       = "${var.queue_name}-sqs-dlq-queue-policy-doc"
    resources = [var.queue_arn]
    actions = [
      "sqs:GetQueueAttributes",
      "sqs:GetQueueUrl",
      "sqs:ListQueueTags",
      "sqs:SendMessage",
    ]
    principals {
      type = "Service"
      identifiers = [
        "sqs.amazonaws.com"
      ]
    }
  }
}

data "aws_iam_policy_document" "queue_policy_doc" {
  source_policy_documents = [
    data.aws_iam_policy_document.queue_fedusers_policy_doc.json,
    data.aws_iam_policy_document.queue_consumer_policy_doc.json,
    data.aws_iam_policy_document.queue_dead_letter_queue_policy_doc.json,
  ]
}