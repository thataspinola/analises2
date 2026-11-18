# ----------------------------------------------------------------
# SQS QUEUES
# ----------------------------------------------------------------
resource "aws_sqs_queue" "sqs_queue" {
  name                       = var.project_name
  visibility_timeout_seconds = var.visibility_timeout_seconds
  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.dlq_queue.arn
    maxReceiveCount     = 10
  })

  depends_on = [
    aws_sqs_queue.dlq_queue
  ]
}

# ------------------------------------------------------------
# SUBSCRIPTIONS
# ------------------------------------------------------------

resource "aws_sns_topic_subscription" "sns_subscription" {
  topic_arn            = var.sns_arn_create_deals
  protocol             = "sqs"
  endpoint             = aws_sqs_queue.sqs_queue.arn
  raw_message_delivery = true
}

# ----------------------------------------------------------------
# SQS DLQS 
# ----------------------------------------------------------------
resource "aws_sqs_queue" "dlq_queue" {
  name                      = "${var.project_name}-dead-letter"
  message_retention_seconds = var.dlq_message_retention_days * 24 * 60 * 60
}


# ----------------------------------------------------------------
# SQS DLQ POLICY DOCUMENTS
# ----------------------------------------------------------------

data "aws_iam_policy_document" "queue_fedusers_policy_doc" {
  statement {
    sid       = "sqs-${var.project_name}-fedusers-policy-doc"
    resources = [aws_sqs_queue.dlq_queue.arn]
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

data "aws_iam_policy_document" "dlq_queue_queue_policy_doc" {
  statement {
    sid       = "sqs-${var.project_name}-dlq-queue-policy-doc"
    resources = [aws_sqs_queue.dlq_queue.arn]
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

data "aws_iam_policy_document" "dlq_queue_policy_doc" {
  source_policy_documents = [
    data.aws_iam_policy_document.queue_fedusers_policy_doc.json,
    data.aws_iam_policy_document.dlq_queue_queue_policy_doc.json,
  ]
}

# ----------------------------------------------------------------
# SQS DLQ POLICY
# ----------------------------------------------------------------

resource "aws_sqs_queue_policy" "dlq_queue_policy" {
  queue_url = aws_sqs_queue.dlq_queue.id
  policy    = data.aws_iam_policy_document.dlq_queue_policy_doc.json
}

# ----------------------------------------------------------------
# SQS DLQ ALARM
# ----------------------------------------------------------------

resource "aws_cloudwatch_metric_alarm" "dlq_queue_alarm" {
  alarm_name          = "${aws_sqs_queue.dlq_queue.name}-not-empty-alarm"
  alarm_description   = "Items are on the ${aws_sqs_queue.dlq_queue.name} queue"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 1
  metric_name         = "ApproximateNumberOfMessagesVisible"
  namespace           = "AWS/SQS"
  period              = 300
  statistic           = "Average"
  threshold           = 1
  treat_missing_data  = "notBreaching"
  dimensions = {
    "QueueName" = aws_sqs_queue.dlq_queue.name
  }
  depends_on = [
    aws_sqs_queue.dlq_queue
  ]
}
