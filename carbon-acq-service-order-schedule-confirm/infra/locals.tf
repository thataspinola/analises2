# ---- LOCALS ----
locals {
  dynatrace_dt_connection_auth_token     = jsondecode(nonsensitive(data.aws_secretsmanager_secret_version.secrets_version.secret_string))["DT_CONNECTION_AUTH_TOKEN"]
  dynatrace_dt_log_collection_auth_token = jsondecode(nonsensitive(data.aws_secretsmanager_secret_version.secrets_version.secret_string))["DT_LOG_COLLECTION_AUTH_TOKEN"]
  queue_name                             = "carbon-acq-service-order-schedule-confirm"
  lambda_function_name                   = "carbon-acq-service-order-schedule-confirm"
}
