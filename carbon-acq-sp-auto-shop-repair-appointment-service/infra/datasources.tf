data "aws_secretsmanager_secret" "secrets" {
  name = "HUB-VENDAS-MIDDLEWARE-SECRETS"
}
data "aws_secretsmanager_secret_version" "secrets_version" {
  secret_id = data.aws_secretsmanager_secret.secrets.id
}
