# -----------------------------------------------------------------
# API GATEWAY
# -----------------------------------------------------------------
resource "aws_api_gateway_deployment" "api_gateway_deployment" {
  rest_api_id = var.api_gateway_id

  lifecycle {
    create_before_destroy = true
  }

  triggers = {
    redeployment = sha1(jsonencode([
      var.rest_api_policy_json,
      var.endpoint_resource_id,
      var.stage_name,
      var.endpoint_http_method,
      var.lambda_invoke_arn
    ]))
  }
}

resource "aws_api_gateway_stage" "api_gateway_stage" {
  stage_name    = var.stage_name
  rest_api_id   = var.api_gateway_id
  deployment_id = aws_api_gateway_deployment.api_gateway_deployment.id

  depends_on = [
    aws_api_gateway_deployment.api_gateway_deployment
  ]
}

resource "aws_api_gateway_method_settings" "api_gateway_method_settings" {
  rest_api_id = var.api_gateway_id
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
    aws_api_gateway_stage.api_gateway_stage
  ]
}

# ----------------------------------------------------------------
# GATEWAY CLOUDWATCH
# ----------------------------------------------------------------

# resource "aws_cloudwatch_log_group" "lambda_cloudwatch" {
#   name              = "API-Gateway-Execution-Logs_${var.api_gateway_id}/${var.stage_name}"
#   retention_in_days = var.cloudwatch_log_retention
# }
