# ---- LOCALS ----
locals {
  vpce                                   = [data.aws_vpc_endpoint.api-gateway-vpce.id]
  account_id                             = data.aws_caller_identity.current.account_id
  vpc_subnet_ids                         = [for cur_subnet in data.aws_subnet.cur_subnets : cur_subnet.id]
  vpc_security_groups_ids                = [data.aws_security_group.lambda.id]
  dynatrace_dt_connection_auth_token     = trimspace(try(jsondecode(nonsensitive(data.aws_secretsmanager_secret_version.secrets_version.secret_string))["DT_CONNECTION_AUTH_TOKEN"], ""))
  dynatrace_dt_log_collection_auth_token = trimspace(try(jsondecode(nonsensitive(data.aws_secretsmanager_secret_version.secrets_version.secret_string))["DT_LOG_COLLECTION_AUTH_TOKEN"], ""))
}
