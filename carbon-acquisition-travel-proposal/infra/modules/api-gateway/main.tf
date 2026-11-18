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
    resources = ["arn:aws:execute-api:${var.aws_region}:${var.account_id}:*/${var.stage_name}/*/*"]
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

# -----------------------------------------------------------------
#  API GATEWAY: METHOD, INTEGRATION
# -----------------------------------------------------------------

resource "aws_api_gateway_method" "api_gateway_method" {
  rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
  resource_id   = aws_api_gateway_rest_api.api_gateway.root_resource_id
  http_method   = var.http_method
  authorization = "NONE"
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
  ]
}

data "template_file" "api_gateway_integration_request_templates" {
  template = file("${path.module}/api_gateway_integration_request_template.json")
  vars = {
    step_function_invoke_arn = var.step_function_invoke_arn
  }
}

resource "aws_api_gateway_integration" "api_gateway_integration" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  resource_id = aws_api_gateway_rest_api.api_gateway.root_resource_id
  http_method = aws_api_gateway_method.api_gateway_method.http_method

  credentials             = var.step_functions_iam_role
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = "arn:aws:apigateway:${var.aws_region}:states:action/StartSyncExecution"

  passthrough_behavior = "NEVER"
  request_templates = {
    "application/json" = data.template_file.api_gateway_integration_request_templates.rendered
  }
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_method.api_gateway_method
  ]
}

resource "aws_api_gateway_method_response" "status_200" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  resource_id = aws_api_gateway_rest_api.api_gateway.root_resource_id
  http_method = aws_api_gateway_method.api_gateway_method.http_method
  status_code = "200"
}

data "template_file" "response_templates" {
  template = file("${path.module}/template.vtl")
}

resource "aws_api_gateway_integration_response" "response" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  resource_id = aws_api_gateway_rest_api.api_gateway.root_resource_id
  http_method = aws_api_gateway_method.api_gateway_method.http_method
  status_code = aws_api_gateway_method_response.status_200.status_code

  # Transforms the backend JSON response into a structured JSON output for the API Gateway
  response_templates = {
    "application/json" = data.template_file.response_templates.rendered
  }


  depends_on = [
    aws_api_gateway_integration.api_gateway_integration
  ]
}

# -----------------------------------------------------------------
# DEPLOYMENT, STAGE, SETTINGS
# -----------------------------------------------------------------

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
      var.step_function_invoke_arn,
      sha1(jsonencode(aws_api_gateway_method_response.status_200)),
      sha1(jsonencode(aws_api_gateway_integration_response.response)),
      sha1(jsonencode(aws_api_gateway_integration.api_gateway_integration)),
      sha1(jsonencode(aws_api_gateway_rest_api.api_gateway)),
    ]))
  }

  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
    aws_api_gateway_rest_api_policy.api_gateway_policy,
    aws_api_gateway_method.api_gateway_method,
    aws_api_gateway_integration.api_gateway_integration
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

# ----------------------------------------------------------------
# GATEWAY CLOUDWATCH
# ----------------------------------------------------------------

resource "aws_cloudwatch_log_group" "step_funcion_cloudwatch" {
  name              = "API-Gateway-Execution-Logs_${aws_api_gateway_rest_api.api_gateway.id}/${var.stage_name}"
  retention_in_days = var.cloudwatch_log_retention
  depends_on = [
    aws_api_gateway_rest_api.api_gateway,
  ]
}

