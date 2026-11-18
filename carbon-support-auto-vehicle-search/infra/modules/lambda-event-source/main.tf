# ----------------------------------------------------------------
# LAMBDA EVENT SOURCE
# ----------------------------------------------------------------

resource "aws_lambda_permission" "lambda_event_source" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.process_lambda_function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_gateway_deployment_execution_arn}/${var.stage_name}/${var.http_method}/${var.path_part}"
}
