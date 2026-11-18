# ----------------------------------------------------------------
# SQS QUEUE
# ----------------------------------------------------------------

resource "aws_sqs_queue" "queue" {
  name                       = var.project_name
  visibility_timeout_seconds = var.visibility_timeout_seconds
  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.queue_dlq.arn
    maxReceiveCount     = var.max_retry_lambda
  })
  depends_on = [
    aws_sqs_queue.queue_dlq
  ]
}

# ----------------------------------------------------------------
# SQS DLQ
# ----------------------------------------------------------------

resource "aws_sqs_queue" "queue_dlq" {
  name                      = "${var.project_name}-dead-letter"
  message_retention_seconds = var.dlq_message_retention_days * 24 * 60 * 60
}

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
        var.lambda_role_arn
      ]
    }
  }
}

data "aws_iam_policy_document" "queue_producer_policy_doc" {
  statement {
    sid       = "${var.project_name}-queue-sns-producer-policy-doc"
    resources = [aws_sqs_queue.queue.arn]
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
        var.approved_payments_sns_arn
      ]
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

data "aws_iam_policy_document" "queue_dead_letter_policy_doc" {
  statement {
    sid       = "${var.project_name}-dlq-policy-doc"
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

data "aws_iam_policy_document" "dlq_policy_doc" {
  source_policy_documents = [
    data.aws_iam_policy_document.queue_fedusers_policy_doc.json,
    data.aws_iam_policy_document.queue_dead_letter_policy_doc.json,
  ]
}

# ----------------------------------------------------------------
# SQS QUEUE POLICY
# ----------------------------------------------------------------

resource "aws_sqs_queue_policy" "queue_policy" {
  queue_url = aws_sqs_queue.queue.id
  policy    = data.aws_iam_policy_document.queue_policy_doc.json
}

# ----------------------------------------------------------------
# SQS DLQ POLICY
# ----------------------------------------------------------------

resource "aws_sqs_queue_policy" "dlq_policy" {
  queue_url = aws_sqs_queue.queue_dlq.id
  policy    = data.aws_iam_policy_document.dlq_policy_doc.json
}

# ------------------------------------------------------------
# SUBSCRIPTIONS
# ------------------------------------------------------------

resource "aws_sns_topic_subscription" "sns_subscription" {
  topic_arn            = var.approved_payments_sns_arn
  protocol             = "sqs"
  endpoint             = aws_sqs_queue.queue.arn
  raw_message_delivery = true
  filter_policy = jsonencode({
    scope = ["travel"]
  })
}
