data "aws_iam_policy_document" "lambda_dynamodb_producer_policy_doc" {
  statement {
    sid = "CarbonInspectionRequestAutoGatherSkdTableQueueConsumerPolicy"
    resources = [
      "${var.inspection_request_auto_gather_schedule_db_table_arn}"
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
  }
}

data "aws_iam_policy_document" "lambda_dynamodb_table_stream_consumer_policy_doc" {
  statement {
    sid = "CarbonInspectionRequestAutoGatherSkdTableStreamConsumerPolicy"
    resources = [
      "${var.inspection_request_auto_gather_schedule_db_table_stream_arn}"
    ]
    actions = [
      "dynamodb:GetShardIterator",
      "dynamodb:DescribeStream",
      "dynamodb:GetRecords",
      "dynamodb:ListStreams"
    ]
  }
}

data "aws_iam_policy_document" "lambda_dynamodb_table_consumer_policy_doc" {
  statement {
    sid = "CarbonInspectionRequestAutoGatherSkdTableConsumerPolicy"
    resources = [
      "${var.inspection_request_auto_gather_schedule_db_table_arn}"
    ]
    actions = [
      "dynamodb:GetItem",
      "dynamodb:BatchGetItem",
      "dynamodb:Scan",
      "dynamodb:Query",
      "dynamodb:ConditionCheckItem"
    ]
  }
}

data "aws_iam_policy_document" "lambda_dynamodb_consumer_policy_doc" {
  source_policy_documents = [
    data.aws_iam_policy_document.lambda_dynamodb_table_consumer_policy_doc.json,
    data.aws_iam_policy_document.lambda_dynamodb_table_stream_consumer_policy_doc.json
  ]
}

resource "aws_iam_policy" "dynamodb_producer_policy" {
  name        = "db-table-${var.inspection_request_auto_gather_schedule_db_table_name}-producer-policy"
  path        = "/"
  description = "Policy that allows ${var.check_inspection_request_lambda_function_name} to write on ${var.inspection_request_auto_gather_schedule_db_table_name} dynamoDB table"
  policy      = data.aws_iam_policy_document.lambda_dynamodb_producer_policy_doc.json
}

resource "aws_iam_policy" "dynamodb_consumer_policy" {
  name        = "db-table-${var.inspection_request_auto_gather_schedule_db_table_name}-consumer-policy"
  path        = "/"
  description = "Policy that allows ${var.check_inspection_request_lambda_function_name} to read ${var.inspection_request_auto_gather_schedule_db_table_name} dynamoDB table"
  policy      = data.aws_iam_policy_document.lambda_dynamodb_consumer_policy_doc.json
}

resource "aws_iam_role_policy_attachment" "producer_policy_attachment" {
  role       = var.check_inspection_request_lambda_role_name
  policy_arn = aws_iam_policy.dynamodb_producer_policy.arn
}

resource "aws_iam_role_policy_attachment" "consumer_policy_attachment" {
  role       = var.check_inspection_request_lambda_role_name
  policy_arn = aws_iam_policy.dynamodb_consumer_policy.arn
}

