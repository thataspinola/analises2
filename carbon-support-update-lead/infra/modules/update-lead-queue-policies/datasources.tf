# ----------------------------------------------------------------
# SQS POLICY DOCUMENTS
# ----------------------------------------------------------------

data "aws_iam_policy_document" "queue_fedusers_policy_doc" {
  statement {
    sid       = "${var.project_name_camel_case}QueueFedusers"
    resources = [var.update_lead_queue_arn]
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
    sid       = "${var.project_name_camel_case}QueueConsumer"
    resources = [var.update_lead_queue_arn]
    actions = [
      "sqs:GetQueueAttributes",
      "sqs:GetQueueUrl",
      "sqs:ListQueueTags",
      "sqs:ChangeMessageVisibility",
      "sqs:DeleteMessage",
      "sqs:ReceiveMessage"
    ]
    principals {
      type        = "AWS"
      identifiers = ["${var.lambda_role_arn}"]
    }
  }
}

data "aws_iam_policy_document" "queue_producer_policy_doc" {
  statement {
    sid       = "${var.project_name_camel_case}QueueProducer"
    resources = [var.update_lead_queue_arn]
    actions = [
      "sqs:GetQueueAttributes",
      "sqs:GetQueueUrl",
      "sqs:ListQueueTags",
      "sqs:SendMessage"
    ]
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
    condition {
      test     = "ArnLike"
      variable = "aws:PrincipalArn"
      values = [
        "arn:aws:iam::${var.account_id}:role/carbon-*"
      ]
    }

    condition {
      test     = "StringEquals"
      variable = "aws:PrincipalTag/sqs-${var.project_name}-external-producer"
      values = [
        "true"
      ]
    }

  }
}

data "aws_iam_policy_document" "queue_travel_proposal_step_function_producer_policy_doc" {
  statement {
    sid       = "${var.project_name_camel_case}TravelProposalSFNProducer"
    resources = [var.update_lead_queue_arn]
    actions = [
      "sqs:GetQueueAttributes",
      "sqs:GetQueueUrl",
      "sqs:ListQueueTags",
      "sqs:SendMessage"
    ]
    principals {
      type = "Service"
      identifiers = [
        "states.amazonaws.com"
      ]
    }
    condition {
      test     = "ArnEquals"
      variable = "aws:SourceArn"
      values = [
        var.travel_proposal_step_function_arn
      ]
    }
  }
}

data "aws_iam_policy_document" "queue_policy_doc" {
  source_policy_documents = [
    data.aws_iam_policy_document.queue_fedusers_policy_doc.json,
    data.aws_iam_policy_document.queue_consumer_policy_doc.json,
    data.aws_iam_policy_document.queue_producer_policy_doc.json,
    data.aws_iam_policy_document.queue_travel_proposal_step_function_producer_policy_doc.json
  ]
}


data "aws_iam_policy_document" "api_gateway_policy_doc" {
  statement {
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:DescribeLogGroups",
      "logs:DescribeLogStreams",
      "logs:PutLogEvents",
      "logs:GetLogEvents",
      "logs:FilterLogEvents"
    ]
    resources = ["*"]
  }
  statement {
    actions = [
      "sqs:GetQueueUrl",
      "sqs:ChangeMessageVisibility",
      "sqs:ListDeadLetterSourceQueues",
      "sqs:SendMessageBatch",
      "sqs:PurgeQueue",
      "sqs:ReceiveMessage",
      "sqs:SendMessage",
      "sqs:GetQueueAttributes",
      "sqs:CreateQueue",
      "sqs:ListQueueTags",
      "sqs:ChangeMessageVisibilityBatch",
      "sqs:SetQueueAttributes"
    ]
    resources = ["${var.update_lead_queue_arn}"]
  }
  statement {
    actions = [
      "sqs:ListQueues"
    ]
    resources = ["*"]
  }
}
