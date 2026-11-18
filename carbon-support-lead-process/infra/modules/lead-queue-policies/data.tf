# ----------------------------------------------------------------
# SQS POLICY DOCUMENTS
# ----------------------------------------------------------------

data "aws_iam_policy_document" "queue_fedusers_policy_doc" {
  statement {
    sid       = "${var.project_name}-sqs-fedusers-policy-doc"
    resources = ["${var.lead_queue_arn}"]
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
    sid       = "${var.project_name}-sqs-producer-policy-doc"
    resources = ["${var.lead_queue_arn}"]
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
    sid       = "${var.project_name}-process-sqs-consumer-policy-doc"
    resources = ["${var.lead_queue_arn}"]
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