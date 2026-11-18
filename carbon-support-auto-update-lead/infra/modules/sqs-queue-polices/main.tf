# ----------------------------------------------------------------
# SQS POLICY DOCUMENTS
# ----------------------------------------------------------------
data "aws_iam_policy_document" "sqs_fedusers_policy_doc" {
  statement {
    sid       = "${var.project_name}-sqs-fedusers-policy-doc"
    resources = [var.auto_update_lead_queue_arn]
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

data "aws_iam_policy_document" "sqs_lambda_producer_policy_doc" {
  statement {
    sid = "${var.project_name}-queue-producer-request-policy-doc"
    resources = [
      "${var.auto_update_lead_queue_arn}"
    ]
    actions = [
      "sqs:GetQueueAttributes",
      "sqs:GetQueueUrl",
      "sqs:ListQueueTags",
      "sqs:SendMessage",
    ]
    principals {
      type = "AWS"
      identifiers = [
        "${var.inspection_request_lambda_role_arn}",
        "${var.auto_quotation_lambda_role_arn}"
      ]
    }
  }
}

data "aws_iam_policy_document" "sqs_lambda_consumer_policy_doc" {
  statement {
    sid       = "${var.project_name}-sqs-lambda-consumer-policy-doc"
    resources = [var.auto_update_lead_queue_arn]
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
        "${var.auto_update_lead_lambda_role_arn}"
      ]
    }
  }
}

data "aws_iam_policy_document" "sqs_all_policy_document" {
  source_policy_documents = [
    data.aws_iam_policy_document.sqs_fedusers_policy_doc.json,
    data.aws_iam_policy_document.sqs_lambda_consumer_policy_doc.json,
    data.aws_iam_policy_document.sqs_lambda_producer_policy_doc.json,
  ]
}

# ----------------------------------------------------------------
# SQS QUEUE POLICY
# ----------------------------------------------------------------
resource "aws_sqs_queue_policy" "queue_policy" {
  queue_url = var.auto_update_lead_queue_url
  policy    = data.aws_iam_policy_document.sqs_all_policy_document.json
}
