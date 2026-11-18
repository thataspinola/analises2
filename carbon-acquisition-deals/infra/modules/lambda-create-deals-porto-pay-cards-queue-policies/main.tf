# ----------------------------------------------------------------
# SQS POLICY DOCUMENTS
# ----------------------------------------------------------------
data "aws_iam_policy_document" "queue_fedusers_policy_doc" {
  statement {
    sid = "${var.project_name}-fedusers-policy-doc"
    resources = [
      "${var.queue_arn}"
    ]
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
    sid = "${var.project_name}-producer-policy-doc"
    resources = [
      "${var.queue_arn}"
    ]
    actions = [
      "sqs:SendMessage"
    ]
    principals {
      type = "Service"
      identifiers = [
        "sns.amazonaws.com"
      ]
    }
    condition {
      test     = "ArnEquals"
      variable = "aws:SourceArn"
      values = [
        var.sns_arn_create_deals
      ]
    }
  }
}

data "aws_iam_policy_document" "queue_consumer_policy_doc" {
  statement {
    sid = "${var.project_name}-consumer-policy-doc"
    resources = [
      "${var.queue_arn}"
    ]
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

# DATA AWS IAM POLICY DOCUMENT
data "aws_iam_policy_document" "queue_policy_doc" {
  source_policy_documents = [
    data.aws_iam_policy_document.queue_fedusers_policy_doc.json,
    data.aws_iam_policy_document.queue_producer_policy_doc.json,
    data.aws_iam_policy_document.queue_consumer_policy_doc.json,
  ]
}

# ----------------------------------------------------------------
# SQS QUEUE POLICY
# ----------------------------------------------------------------

resource "aws_sqs_queue_policy" "queue_policy" {
  queue_url = var.queue_url
  policy    = data.aws_iam_policy_document.queue_policy_doc.json
}
