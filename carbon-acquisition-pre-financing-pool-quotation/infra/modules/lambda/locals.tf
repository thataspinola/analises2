# ---- LOCALS ----
locals {
  dynatrace_lambda_layers = var.DYNATRACE_DT_TENANT == "" ? [] : [var.dynatrace_oneAgent_layer]
  dynatrace_lambda_variables = var.DYNATRACE_DT_TENANT == "" ? {} : {
    AWS_LAMBDA_EXEC_WRAPPER              = var.DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER
    DT_TENANT                            = var.DYNATRACE_DT_TENANT
    DT_CLUSTER_ID                        = var.DYNATRACE_DT_CLUSTER_ID
    DT_CONNECTION_BASE_URL               = var.DYNATRACE_DT_CONNECTION_BASE_URL
    DT_CONNECTION_AUTH_TOKEN             = var.DYNATRACE_DT_CONNECTION_AUTH_TOKEN
    DT_LOG_COLLECTION_AUTH_TOKEN         = var.DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN
    DT_OPEN_TELEMETRY_ENABLE_INTEGRATION = var.DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION
  }
  twistlock_lambda_layers = var.TWISTLOCK_DISABLED ? [] : [var.twistlock_layer_arn]
  twistlock_lambda_variables = var.TWISTLOCK_DISABLED ? {} : {
    TW_POLICY        = "${var.TWISTLOCK_POLICY}"
    ORIGINAL_HANDLER = "index.handler"
  }
  lambda_handler          = var.TWISTLOCK_DISABLED ? "index.handler" : "twistlock.handler"
  vpc_subnet_ids          = var.is_poc ? [] : var.vpc_subnet_ids
  vpc_security_groups_ids = var.is_poc ? [] : var.vpc_security_groups_ids

}
