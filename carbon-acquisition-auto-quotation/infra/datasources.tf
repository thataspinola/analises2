data "aws_secretsmanager_secret" "secrets" {
  name = "HUB-VENDAS-MIDDLEWARE-SECRETS"
}
data "aws_secretsmanager_secret_version" "secrets_version" {
  secret_id = data.aws_secretsmanager_secret.secrets.id
}

data "aws_api_gateway_rest_api" "carbon_acquisition_shopping_cart_upsert_cart" {
  name = var.carbon_acquisition_shopping_cart_upsert_cart_gateway_name
}
