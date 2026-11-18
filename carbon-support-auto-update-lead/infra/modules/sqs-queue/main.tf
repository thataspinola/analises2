# ----------------------------------------------------------------
# SQS QUEUE
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

# ----------------------------------------------------------------
# SQS DLQ 
# ----------------------------------------------------------------
resource "aws_sqs_queue" "dlq_queue" {
  name                      = "${var.project_name}-dead-letter"
  message_retention_seconds = var.dlq_message_retention_days * 24 * 60 * 60
}

# ----------------------------------------------------------------
# SQS DLQ POLICY DOCUMENT
# ----------------------------------------------------------------

data "aws_iam_policy_document" "dlq_fedusers_policy_document" {
  statement {
    sid       = "${var.project_name}-dlq-fedusers-policy-doc"
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

data "aws_iam_policy_document" "dlq_service_policy_document" {
  statement {
    sid       = "${var.project_name}-dlq-service-policy-doc"
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

data "aws_iam_policy_document" "dlq_all_policy_document" {
  source_policy_documents = [
    data.aws_iam_policy_document.dlq_fedusers_policy_document.json,
    data.aws_iam_policy_document.dlq_service_policy_document.json,
  ]
}

# ----------------------------------------------------------------
# SQS DLQ POLICY
# ----------------------------------------------------------------
resource "aws_sqs_queue_policy" "carbon_auto_update_lead_sqs_dlq_policy" {
  queue_url = aws_sqs_queue.dlq_queue.id
  policy    = data.aws_iam_policy_document.dlq_all_policy_document.json
}

# ----------------------------------------------------------------
# SQS DLQ ALARM
# ----------------------------------------------------------------
resource "aws_cloudwatch_metric_alarm" "carbon_auto_update_lead_sqs_dlq_alarm" {
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
}