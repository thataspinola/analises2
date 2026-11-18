resource "aws_dynamodb_resource_policy" "table_policy" {
  resource_arn = var.table_arn
  policy       = data.aws_iam_policy_document.table_policy_doc.json
}
