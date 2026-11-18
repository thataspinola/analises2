# ----------------------------------------------------------------
# SQS POLICY DOCUMENTS
# ----------------------------------------------------------------

data "aws_iam_policy_document" "queue_fedusers_policy_doc" {
  statement {
    sid       = "${var.project_name}-sqs-fedusers-policy-doc"
    resources = [aws_sqs_queue.queue.arn]
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
    sid       = "${var.project_name}-sqs-consumer-policy-doc"
    resources = [aws_sqs_queue.queue.arn]
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

data "aws_iam_policy_document" "queue_producer_policy_doc" {
  statement {
    sid       = "${var.project_name}-sqs-producer-policy-doc"
    resources = [aws_sqs_queue.queue.arn]
    actions = [
      "sqs:GetQueueAttributes",
      "sqs:GetQueueUrl",
      "sqs:ListQueueTags",
      "sqs:SendMessage",
    ]

    condition {
      test     = "ArnLike"
      variable = "aws:PrincipalArn"
      values = [
        "arn:aws:iam::${var.account_id}:role/carbon-*"
      ]
    }
    
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}

data "aws_iam_policy_document" "queue_policy_doc" {
  source_policy_documents = [
    data.aws_iam_policy_document.queue_fedusers_policy_doc.json,
    data.aws_iam_policy_document.queue_consumer_policy_doc.json,
    data.aws_iam_policy_document.queue_producer_policy_doc.json
  ]
}

data "aws_iam_policy_document" "queue_dlq_queue_policy_doc" {
  statement {
    sid       = "${var.project_name}-sqs-dlq-queue-policy-doc"
    resources = [aws_sqs_queue.queue_dlq.arn]
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

data "aws_iam_policy_document" "queue_dlq_policy_doc" {
  source_policy_documents = [
    data.aws_iam_policy_document.queue_fedusers_policy_doc.json,
    data.aws_iam_policy_document.queue_dlq_queue_policy_doc.json,
  ]
}
