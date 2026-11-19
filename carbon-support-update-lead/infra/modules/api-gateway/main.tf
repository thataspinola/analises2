# -----------------------------------------------------------------
# API GATEWAY ROLES
# -----------------------------------------------------------------

data "aws_iam_policy_document" "api_gateway_assume_policy_doc" {
  statement {
    actions = ["sts:AssumeRole"]
    sid     = ""
    effect  = "Allow"
    principals {
      type        = "Service"
      identifiers = ["apigateway.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "api_gateway_role" {
  name = "${var.project_name}-gateway-sqs"

  assume_role_policy = data.aws_iam_policy_document.api_gateway_assume_policy_doc.json
}

# -----------------------------------------------------------------
# API GATEWAY
# -----------------------------------------------------------------

resource "aws_api_gateway_rest_api" "api_gateway" {
  name = "${var.project_name}-gateway"
  endpoint_configuration {
    types            = ["PRIVATE"]
    vpc_endpoint_ids = var.vpce
  }
}

data "aws_iam_policy_document" "api_gateway_policy_doc" {
  statement {
    actions = ["execute-api:Invoke"]
    principals {
      type        = "*"
      identifiers = ["*"]
    }
    resources = ["execute-api:/${var.stage_name}/${var.http_method}/${var.path_part}"]
  }
}

resource "aws_api_gateway_rest_api_policy" "api_gateway_policy" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  policy      = data.aws_iam_policy_document.api_gateway_policy_doc.json
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    data.aws_iam_policy_document.api_gateway_policy_doc
  ]
}

resource "aws_api_gateway_resource" "api_gateway_resource" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  parent_id   = aws_api_gateway_rest_api.api_gateway.root_resource_id
  path_part   = var.path_part
  depends_on = [
    aws_api_gateway_rest_api.api_gateway
  ]
}

resource "aws_api_gateway_method" "api_gateway_method" {
  rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
  resource_id   = aws_api_gateway_resource.api_gateway_resource.id
  http_method   = var.http_method
  authorization = "NONE"
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_resource.api_gateway_resource
  ]
}

resource "aws_api_gateway_integration" "api_gateway_integration" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  resource_id = aws_api_gateway_resource.api_gateway_resource.id
  http_method = aws_api_gateway_method.api_gateway_method.http_method

  integration_http_method = "POST"
  type                    = "AWS"
  credentials             = aws_iam_role.api_gateway_role.arn
  uri                     = "arn:aws:apigateway:${var.aws_region}:sqs:path/${var.account_id}/${var.project_name}"

  request_parameters = {
    "integration.request.header.Content-Type" = "'application/x-www-form-urlencoded'"
  }

  request_templates = {
    "application/json" = "Action=SendMessage&MessageBody=$util.urlEncode($input.body)"
  }

  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_resource.api_gateway_resource,
    aws_api_gateway_method.api_gateway_method,
    aws_iam_role.api_gateway_role
  ]
}

resource "aws_api_gateway_integration_response" "http200" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  resource_id = aws_api_gateway_resource.api_gateway_resource.id
  http_method = aws_api_gateway_method.api_gateway_method.http_method
  status_code = aws_api_gateway_method_response.http200.status_code

  response_templates = {
    "application/json" = "{\"message\": \"Mensagem em processamento\"}"
  }

  depends_on = [
    aws_api_gateway_integration.api_gateway_integration,
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_resource.api_gateway_resource,
    aws_api_gateway_method.api_gateway_method,
    aws_api_gateway_method_response.http200
  ]
}
resource "aws_api_gateway_method_response" "http200" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  resource_id = aws_api_gateway_resource.api_gateway_resource.id
  http_method = aws_api_gateway_method.api_gateway_method.http_method
  status_code = "200"

  response_models = {
    "application/json" = "Empty"
  }

  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_resource.api_gateway_resource,
    aws_api_gateway_method.api_gateway_method
  ]
}

resource "aws_api_gateway_integration_response" "http4xx" {
  rest_api_id       = aws_api_gateway_rest_api.api_gateway.id
  resource_id       = aws_api_gateway_resource.api_gateway_resource.id
  http_method       = aws_api_gateway_method.api_gateway_method.http_method
  status_code       = aws_api_gateway_method_response.http4xx.status_code
  selection_pattern = "^4[0-9][0-9]"

  response_templates = {
    "application/json" = "{\"message\": \"Erro ao acionar fila do update-lead\"}"
  }

  depends_on = [
    aws_api_gateway_integration.api_gateway_integration,
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_resource.api_gateway_resource,
    aws_api_gateway_method.api_gateway_method,
    aws_api_gateway_method_response.http4xx
  ]
}
resource "aws_api_gateway_method_response" "http4xx" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  resource_id = aws_api_gateway_resource.api_gateway_resource.id
  http_method = aws_api_gateway_method.api_gateway_method.http_method
  status_code = "400"

  response_models = {
    "application/json" = "Empty"
  }

  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_resource.api_gateway_resource,
    aws_api_gateway_method.api_gateway_method
  ]
}
resource "aws_api_gateway_integration_response" "http5xx" {
  rest_api_id       = aws_api_gateway_rest_api.api_gateway.id
  resource_id       = aws_api_gateway_resource.api_gateway_resource.id
  http_method       = aws_api_gateway_method.api_gateway_method.http_method
  status_code       = aws_api_gateway_method_response.http5xx.status_code
  selection_pattern = "^5[0-9][0-9]$"

  response_templates = {
    "application/json" = "{\"message\": \"Erro ao acionar fila do update-lead\"}"
  }

  depends_on = [
    aws_api_gateway_integration.api_gateway_integration
  ]
}

resource "aws_api_gateway_method_response" "http5xx" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  resource_id = aws_api_gateway_resource.api_gateway_resource.id
  http_method = aws_api_gateway_method.api_gateway_method.http_method
  status_code = "500"

  response_models = {
    "application/json" = "Empty"
  }
}

resource "aws_api_gateway_deployment" "api_gateway_deployment" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id

  lifecycle {
    create_before_destroy = true
  }

  triggers = {
    redeployment = sha1(jsonencode([
      data.aws_iam_policy_document.api_gateway_policy_doc.json,
      var.stage_name,
      var.http_method,
      var.path_part,
      aws_api_gateway_integration.api_gateway_integration,
      aws_api_gateway_integration_response.http200,
      aws_api_gateway_method_response.http200,
      aws_api_gateway_integration_response.http4xx,
      aws_api_gateway_method_response.http4xx,
      aws_api_gateway_integration_response.http5xx,
      aws_api_gateway_method_response.http5xx
    ]))
  }

  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_rest_api_policy.api_gateway_policy,
    aws_api_gateway_resource.api_gateway_resource,
    aws_api_gateway_method.api_gateway_method,
    aws_api_gateway_integration.api_gateway_integration,
    aws_api_gateway_integration_response.http200,
    aws_api_gateway_integration_response.http4xx,
    aws_api_gateway_integration_response.http5xx
  ]
}

resource "aws_api_gateway_stage" "api_gateway_stage" {
  stage_name    = var.stage_name
  rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
  deployment_id = aws_api_gateway_deployment.api_gateway_deployment.id

  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_deployment.api_gateway_deployment
  ]
}

resource "aws_api_gateway_method_settings" "api_gateway_method_settings" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  stage_name  = aws_api_gateway_stage.api_gateway_stage.stage_name
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
    aws_api_gateway_stage.api_gateway_stage
  ]
}