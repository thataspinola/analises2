# ---- LOCALS ----
locals {
  dynatrace_dt_connection_auth_token     = try(jsondecode(nonsensitive(data.aws_secretsmanager_secret_version.secrets_version.secret_string))["DT_CONNECTION_AUTH_TOKEN"], "")
  dynatrace_dt_log_collection_auth_token = try(jsondecode(nonsensitive(data.aws_secretsmanager_secret_version.secrets_version.secret_string))["DT_LOG_COLLECTION_AUTH_TOKEN"], "")
  portoservico_sendgrid_auth_token       = try(jsondecode(nonsensitive(data.aws_secretsmanager_secret_version.secrets_version.secret_string))["PORTO_SERVICO_SENDGRID_AUTH_TOKEN"], "")
}
