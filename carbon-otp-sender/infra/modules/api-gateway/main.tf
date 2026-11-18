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
      "execute-api:/${var.request_stage_name}/${var.request_http_method}/${var.request_path_part}",
      "execute-api:/${var.check_stage_name}/${var.check_http_method}/${var.check_path_part}"
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
# [request] API GATEWAY: RESOURCE, METHOD, INTEGRATION
# -----------------------------------------------------------------

resource "aws_api_gateway_resource" "request_gateway_resource" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  parent_id   = aws_api_gateway_rest_api.api_gateway.root_resource_id
  path_part   = var.request_path_part
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
  ]
}

resource "aws_api_gateway_method" "request_gateway_method" {
  rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
  resource_id   = aws_api_gateway_resource.request_gateway_resource.id
  http_method   = var.request_http_method
  authorization = "NONE"
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_resource.request_gateway_resource
  ]
}

resource "aws_api_gateway_integration" "request_gateway_integration" {
  rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
  resource_id             = aws_api_gateway_resource.request_gateway_resource.id
  http_method             = aws_api_gateway_method.request_gateway_method.http_method
  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  uri                     = var.request_lambda_invoke_arn
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_resource.request_gateway_resource,
    aws_api_gateway_method.request_gateway_method
  ]
}

# -----------------------------------------------------------------
# [check] API GATEWAY: RESOURCE, METHOD, INTEGRATION
# -----------------------------------------------------------------

resource "aws_api_gateway_resource" "check_gateway_resource" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  parent_id   = aws_api_gateway_rest_api.api_gateway.root_resource_id
  path_part   = var.check_path_part
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
  ]
}

resource "aws_api_gateway_method" "check_gateway_method" {
  rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
  resource_id   = aws_api_gateway_resource.check_gateway_resource.id
  http_method   = var.check_http_method
  authorization = "NONE"
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_resource.check_gateway_resource
  ]
}

resource "aws_api_gateway_integration" "check_gateway_integration" {
  rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
  resource_id             = aws_api_gateway_resource.check_gateway_resource.id
  http_method             = aws_api_gateway_method.check_gateway_method.http_method
  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  uri                     = var.check_lambda_invoke_arn
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_resource.check_gateway_resource,
    aws_api_gateway_method.check_gateway_method
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
      aws_api_gateway_integration.request_gateway_integration,
      aws_api_gateway_integration.check_gateway_integration,
      data.aws_iam_policy_document.gateway_invoke_policy_doc.json,
      var.request_stage_name,
      var.request_http_method,
      var.request_path_part,
      var.check_stage_name,
      var.check_http_method,
      var.check_path_part
    ]))
  }
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_integration.request_gateway_integration,
    aws_api_gateway_integration.check_gateway_integration,
    aws_api_gateway_rest_api_policy.gateway_policy
  ]
}

resource "aws_api_gateway_stage" "gateway_stage" {
  stage_name    = "v1"
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
