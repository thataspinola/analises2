# -----------------------------------------------------------------
# API GATEWAY
# -----------------------------------------------------------------

resource "aws_api_gateway_rest_api" "api_gateway" {
  name = var.api_gateway_name
  endpoint_configuration {
    types            = ["PRIVATE"]
    vpc_endpoint_ids = var.vpce
  }
}

data "aws_iam_policy_document" "gateway_invoke_policy_doc" {
  statement {
    actions = ["execute-api:Invoke"]
    principals {
      type        = "*"
      identifiers = ["*"]
    }
    resources = [
      "execute-api:/${var.stage_name}/${var.create_deals_http_method}/${var.create_deals_path_part}",
      "execute-api:/${var.stage_name}/${var.find_deals_http_method}/${var.find_deals_path_part}"
    ]
  }
}

resource "aws_api_gateway_rest_api_policy" "gateway_policy" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  policy      = data.aws_iam_policy_document.gateway_invoke_policy_doc.json
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    data.aws_iam_policy_document.gateway_invoke_policy_doc
  ]
}

# -----------------------------------------------------------------
# [create_deals] API GATEWAY: RESOURCE, METHOD, INTEGRATION
# -----------------------------------------------------------------

resource "aws_api_gateway_resource" "create_deals_gateway_resource" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  parent_id   = aws_api_gateway_rest_api.api_gateway.root_resource_id
  path_part   = var.create_deals_path_part
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
  ]
}

resource "aws_api_gateway_method" "create_deals_gateway_method" {
  rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
  resource_id   = aws_api_gateway_resource.create_deals_gateway_resource.id
  http_method   = var.create_deals_http_method
  authorization = "NONE"
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_resource.create_deals_gateway_resource
  ]
}

resource "aws_api_gateway_integration" "create_deals_gateway_integration" {
  rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
  resource_id             = aws_api_gateway_resource.create_deals_gateway_resource.id
  http_method             = aws_api_gateway_method.create_deals_gateway_method.http_method
  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  uri                     = var.create_deals_lambda_invoke_arn
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_resource.create_deals_gateway_resource,
    aws_api_gateway_method.create_deals_gateway_method
  ]
}

# -----------------------------------------------------------------
# [find_deals] API GATEWAY: RESOURCE, METHOD, INTEGRATION
# -----------------------------------------------------------------

resource "aws_api_gateway_resource" "find_deals_gateway_resource" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  parent_id   = aws_api_gateway_rest_api.api_gateway.root_resource_id
  path_part   = var.find_deals_path_part
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
  ]
}

resource "aws_api_gateway_method" "find_deals_gateway_method" {
  rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
  resource_id   = aws_api_gateway_resource.find_deals_gateway_resource.id
  http_method   = var.find_deals_http_method
  authorization = "NONE"
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_resource.find_deals_gateway_resource
  ]
}

resource "aws_api_gateway_integration" "find_deals_gateway_integration" {
  rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
  resource_id             = aws_api_gateway_resource.find_deals_gateway_resource.id
  http_method             = aws_api_gateway_method.find_deals_gateway_method.http_method
  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  uri                     = var.find_deals_lambda_invoke_arn
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_resource.find_deals_gateway_resource,
    aws_api_gateway_method.find_deals_gateway_method
  ]
}

# -----------------------------------------------------------------
# DEPLOYMENT, STAGE
# -----------------------------------------------------------------

resource "aws_api_gateway_deployment" "gateway_deployment" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  lifecycle {
    create_before_destroy = true
  }
  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_rest_api.api_gateway,
      aws_api_gateway_integration.create_deals_gateway_integration,
      aws_api_gateway_integration.find_deals_gateway_integration,
      data.aws_iam_policy_document.gateway_invoke_policy_doc.json,
      var.stage_name,
      var.create_deals_http_method,
      var.create_deals_path_part,
      var.find_deals_http_method,
      var.find_deals_path_part
    ]))
  }
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_integration.create_deals_gateway_integration,
    aws_api_gateway_integration.find_deals_gateway_integration,
    aws_api_gateway_rest_api_policy.gateway_policy
  ]
}

resource "aws_api_gateway_stage" "gateway_stage" {
  stage_name    = var.stage_name
  rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
  deployment_id = aws_api_gateway_deployment.gateway_deployment.id
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_deployment.gateway_deployment
  ]
}

resource "aws_api_gateway_method_settings" "gateway_rest_api_method_settings" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  stage_name  = aws_api_gateway_stage.gateway_stage.stage_name
  method_path = "*/*"
  settings {
    logging_level          = "INFO"
    data_trace_enabled     = true
    metrics_enabled        = true
    throttling_burst_limit = var.throttling_burst_limit
    throttling_rate_limit  = var.throttling_rate_limit
  }
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_deployment.gateway_deployment,
    aws_api_gateway_stage.gateway_stage
  ]
}
