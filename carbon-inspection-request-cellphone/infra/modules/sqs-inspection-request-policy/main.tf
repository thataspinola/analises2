# ----------------------------------------------------------------
# SQS QUEUE POLICY
# ----------------------------------------------------------------

data "aws_iam_policy_document" "queue_fedusers_policy_doc" {
  statement {
    sid       = "${var.project_name}-sqs-fedusers-policy-doc"
    resources = [var.sqs_inepection_request_arn]
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
    resources = [var.sqs_inepection_request_arn]
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
    resources = [var.sqs_inepection_request_arn]
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
        var.inspection_ready_sns_arn
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


resource "aws_sqs_queue_policy" "queue_policy" {
  queue_url = var.sqs_inepection_request_id
  policy    = data.aws_iam_policy_document.queue_policy_doc.json
}

# ----------------------------------------------------------------
# SQS DLQ POLICY
# ----------------------------------------------------------------

data "aws_iam_policy_document" "queue_dead_letter_policy_doc" {
  statement {
    sid       = "${var.project_name}-dlq-lambda-producer-policy-doc"
    resources = [var.dlq_inepection_request_arn]
    actions = [
      "sqs:GetQueueAttributes",
      "sqs:GetQueueUrl",
      "sqs:ListQueueTags",
      "sqs:SendMessage",
    ]
    principals {
      type = "AWS"
      identifiers = [
        "${var.producer_inpection_fail_lambda_role_arn}",
      ]
    }
  }
}

data "aws_iam_policy_document" "dlq_policy_doc" {
  source_policy_documents = [
    data.aws_iam_policy_document.queue_dead_letter_policy_doc.json,
  ]
}

resource "aws_sqs_queue_policy" "dlq_policy" {
  queue_url = var.dlq_inepection_request_id
  policy    = data.aws_iam_policy_document.dlq_policy_doc.json
}

# ----------------------------------------------------------------
# SQS DLQ ALARM
# ----------------------------------------------------------------

resource "aws_cloudwatch_metric_alarm" "dlq_alarm" {
  alarm_name          = "${var.project_name}-dead-letter-not-empty-alarm"
  alarm_description   = "Items are on the ${var.project_name} queue"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 1
  metric_name         = "ApproximateNumberOfMessagesVisible"
  namespace           = "AWS/SQS"
  period              = 300
  statistic           = "Average"
  threshold           = 1
  treat_missing_data  = "notBreaching"
  dimensions = {
    "QueueName" = "${var.project_name}-dead-letter"
  }
}

