# -----------------------------------------------------------------
# LAMBDA PERMISSION
# -----------------------------------------------------------------

resource "aws_lambda_permission" "lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_gateway_execution_arn}/${var.api_gateway_stage_name}/${var.api_gateway_http_method}/"
}
