# ----------------------------------------------------------------
# SQS QUEUE
# ----------------------------------------------------------------

resource "aws_sqs_queue" "queue" {
  name                       = "carbon-acq-pre-financing-pool-direct-contact-requests"
  visibility_timeout_seconds = var.visibility_timeout_seconds
  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.queue_dlq.arn
    maxReceiveCount     = var.redrive_policy_max_receive_count
  })

  depends_on = [
    aws_sqs_queue.queue_dlq
  ]
}

# ----------------------------------------------------------------
# SQS DLQ
# ----------------------------------------------------------------

resource "aws_sqs_queue" "queue_dlq" {
  name                      = "carbon-acq-pre-financing-pool-direct-contact-requests-dead-letter"
  message_retention_seconds = var.dlq_message_retention_days * 24 * 60 * 60
}

# ----------------------------------------------------------------
# SQS DLQ POLICY DOCUMENTS
# ----------------------------------------------------------------

data "aws_iam_policy_document" "queue_fedusers_policy_doc" {
  statement {
    sid       = "carbon-acq-pre-financing-pool-direct-contact-requests-sqs-fedusers-policy-doc"
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
    sid       = "carbon-acq-pre-financing-pool-direct-contact-requests-sqs-dlq-queue-policy-doc"
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
  evaluation_periods  = var.cloudwatch_metric_alarm_evaluation_periods_count
  metric_name         = "ApproximateNumberOfMessagesVisible"
  namespace           = "AWS/SQS"
  period              = 600
  statistic           = "Average"
  threshold           = 20
  treat_missing_data  = "notBreaching"
  dimensions = {
    "QueueName" = aws_sqs_queue.queue_dlq.name
  }
  depends_on = [
    aws_sqs_queue.queue_dlq
  ]
}