resource "aws_apigatewayv2_api_mapping" "custom_domain_base_path_mapping" { # utilizar aws_apigatewayv2_api_mapping para permitir path com varias /
  api_id          = var.api_gateway_id
  domain_name     = data.aws_api_gateway_domain_name.api_custom_domain_fqn.domain_name
  stage           = var.stage_name
  api_mapping_key = var.api_custom_domain_path
}