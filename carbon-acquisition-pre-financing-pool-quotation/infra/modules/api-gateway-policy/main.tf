# -----------------------------------------------------------------
# API GATEWAY
# -----------------------------------------------------------------
resource "aws_api_gateway_rest_api_policy" "api_gateway_policy" {
  rest_api_id = var.api_gateway_id
  policy      = data.aws_iam_policy_document.api_gateway_policy_doc.json
}
