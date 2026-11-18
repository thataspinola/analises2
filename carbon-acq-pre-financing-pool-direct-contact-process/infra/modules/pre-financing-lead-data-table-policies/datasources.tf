data "aws_iam_policy_document" "table_producer_policy_doc" {
  statement {
    sid = "CarbonDynamoDBTableProducerPolicy"
    resources = [
      "${var.table_arn}"
    ]
    actions = [
      "dynamodb:BatchGetItem",
      "dynamodb:BatchWriteItem",
      "dynamodb:ConditionCheckItem",
      "dynamodb:PutItem",
      "dynamodb:DescribeTable",
      "dynamodb:DeleteItem",
      "dynamodb:GetItem",
      "dynamodb:Scan",
      "dynamodb:Query",
      "dynamodb:UpdateItem"
    ]
    condition {
      test     = "ArnLike"
      variable = "aws:PrincipalArn"
      values = [
        "arn:aws:iam::${var.account_id}:role/${var.prefix_project_name}-*",
      ]
    }
    principals {
      type = "AWS"
      identifiers = [
        "*"
      ]
    }
  }
}

data "aws_iam_policy_document" "table_consumer_policy_doc" {
  statement {
    sid = "CarbonDynamoDBTableConsumerPolicy"
    resources = [
      "${var.table_arn}"
    ]
    actions = [
      "dynamodb:GetItem",
      "dynamodb:BatchGetItem",
      "dynamodb:Scan",
      "dynamodb:Query",
      "dynamodb:ConditionCheckItem"
    ]
    condition {
      test     = "ArnLike"
      variable = "aws:PrincipalArn"
      values = [
        "arn:aws:iam::${var.account_id}:role/carbon-api-token-*"
      ]
    }
    principals {
      type = "AWS"
      identifiers = [
        "*"
      ]
    }
  }
}

data "aws_iam_policy_document" "table_fedusers_policy_doc" {
  statement {
    sid = "CarbonDynamoDBTableFedusersPolicy"
    resources = [
      "${var.table_arn}"
    ]
    actions = [
      "dynamodb:GetItem",
      "dynamodb:BatchGetItem",
      "dynamodb:DescribeTable",
      "dynamodb:Scan",
      "dynamodb:Query",
      "dynamodb:ConditionCheckItem"
    ]
    condition {
      test     = "ArnLike"
      variable = "aws:PrincipalArn"
      values = [
        "arn:aws:sts::${var.account_id}:*@portoseguro.com.br"
      ]
    }
    condition {
      test     = "StringEquals"
      variable = "aws:SourceOwner"
      values = [
        "${var.account_id}"
      ]
    }
    principals {
      type        = "Federated"
      identifiers = ["*"]
    }
  }
}

data "aws_iam_policy_document" "table_policy_doc" {
  source_policy_documents = [
    data.aws_iam_policy_document.table_producer_policy_doc.json,
    data.aws_iam_policy_document.table_consumer_policy_doc.json,
    data.aws_iam_policy_document.table_fedusers_policy_doc.json,
  ]
}
