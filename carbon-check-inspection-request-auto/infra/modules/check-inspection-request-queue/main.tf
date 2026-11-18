# ----------------------------------------------------------------
# SQS QUEUE
# ----------------------------------------------------------------

resource "aws_sqs_queue" "queue" {
  name                       = var.queue_name
  visibility_timeout_seconds = var.visibility_timeout_seconds
  delay_seconds              = var.delay_seconds
  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.queue_dlq.arn
    maxReceiveCount     = 1
  })

  depends_on = [
    aws_sqs_queue.queue_dlq
  ]
}

# ----------------------------------------------------------------
# SQS DLQ
# ----------------------------------------------------------------

resource "aws_sqs_queue" "queue_dlq" {
  name                      = "${var.queue_name}-dead-letter"
  message_retention_seconds = var.dlq_message_retention_days * 24 * 60 * 60
}

# ----------------------------------------------------------------
# SQS DLQ POLICY DOCUMENTS
# ----------------------------------------------------------------

data "aws_iam_policy_document" "queue_fedusers_policy_doc" {
  statement {
    sid       = "sqs-${var.queue_name}-fedusers-policy-doc"
    resources = [aws_sqs_queue.queue_dlq.arn]
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

data "aws_iam_policy_document" "queue_dlq_queue_policy_doc" {
  statement {
    sid       = "sqs-${var.queue_name}-dlq-queue-policy-doc"
    resources = [aws_sqs_queue.queue_dlq.arn]
    actions = [
      "sqs:GetQueueAttributes",
      "sqs:GetQueueUrl",
      "sqs:ListQueueTags",
      "sqs:SendMessage",
    ]
    principals {
      type = "AWS"
      identifiers = [
        "${var.check_inspection_request_lambda_role_arn}"
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

# ----------------------------------------------------------------
# SQS DLQ POLICY
# ----------------------------------------------------------------

resource "aws_sqs_queue_policy" "queue_dlq_policy" {
  queue_url = aws_sqs_queue.queue_dlq.id
  policy    = data.aws_iam_policy_document.queue_dlq_policy_doc.json
}

# ----------------------------------------------------------------
# SQS DLQ ALARM
# ----------------------------------------------------------------

resource "aws_cloudwatch_metric_alarm" "queue_dlq_alarm" {
  alarm_name          = "${aws_sqs_queue.queue_dlq.name}-not-empty-alarm"
  alarm_description   = "Items are on the ${aws_sqs_queue.queue_dlq.name} queue"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 1
  metric_name         = "ApproximateNumberOfMessagesVisible"
  namespace           = "AWS/SQS"
  period              = 300
  statistic           = "Average"
  threshold           = 1
  treat_missing_data  = "notBreaching"
  dimensions = {
    "QueueName" = aws_sqs_queue.queue_dlq.name
  }
  depends_on = [
    aws_sqs_queue.queue_dlq
  ]
}

