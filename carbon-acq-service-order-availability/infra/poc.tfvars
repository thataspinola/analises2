# -----------------------------------------------------------------
# POC TFVARS
# -----------------------------------------------------------------

# General terraform parameters
account_id               = "385020771841"
vpce                     = ["vpce-0224986cf48912f3c"]
vpc_subnet_ids           = ["subnet-08042b24351d7291e", "subnet-06e29859b742a5142"]
vpc_security_group_id    = ["sg-0918bc7be0d05df35"]
lambda_timeout           = 29
cloudwatch_log_retention = 3

# Application parameters
NODE_ENV                                    = "development"
GATEWAY_URL                                 = "https://osbhmlwfm.portoseguro.brasil"
API_PATH                                    = "AgendaAtendimentoSocorristaIntegrationService/AgendaAtendimentoSocorristaIntegrationServiceRestV1_0/RegularAgenda"
dynatrace_oneAgent_layer                    = ""
dynatrace_dt_tenant                         = ""
dynatrace_dt_cluster_id                     = ""
dynatrace_dt_connection_base_url            = ""
dynatrace_open_telemetry_enable_integration = ""
carbon_api_custom_domain_fqn                = "api.hub-de-vendas-carbon.dev.awsporto"

FISCAL_COMPANY_CODE = 95