data "aws_iam_policy_document" "api_gateway_policy_doc" {
  statement {
    actions = ["execute-api:Invoke"]
    principals {
      type        = "*"
      identifiers = ["*"]
    }
    resources = [
      "arn:aws:execute-api:${var.AWS_REGION}:${var.account_id}:${var.api_gateway_id}/${var.stage_name}/${var.endpoint_http_method}/",
    ]
  }
}
