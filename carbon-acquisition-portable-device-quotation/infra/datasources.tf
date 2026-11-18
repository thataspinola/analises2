# -----------------------------------------------------------------
# DATA SOURCES
# -----------------------------------------------------------------
data "aws_secretsmanager_secret" "secrets" {
  name = "HUB-VENDAS-MIDDLEWARE-SECRETS"
}
data "aws_secretsmanager_secret_version" "secrets_version" {
  secret_id = data.aws_secretsmanager_secret.secrets.id
}

data "aws_api_gateway_rest_api" "carbon_support_create_lead" {
  name = var.carbon_support_create_lead_gateway_name
}