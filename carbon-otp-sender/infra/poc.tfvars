# -----------------------------------------------------------------
# POC TFVARS
# -----------------------------------------------------------------

# Terraform parameters
account_id                              = "385020771841"
vpce                                    = ["vpce-0224986cf48912f3c"]
api_gateway_throttling_burst_limit      = 5000
api_gateway_throttling_rate_limit       = 10000
token_layer_name                        = "carbon_token_layer"
vpc_subnet_ids                          = ["subnet-08042b24351d7291e", "subnet-06e29859b742a5142"]
vpc_security_group_id                   = ["sg-0918bc7be0d05df35"]
lambda_timeout                          = 60
lambda_timeout_sender                   = 90
lambda_cloudwatch_log_retention         = 3
sender_queue_visibility_timeout_seconds = 90
dlq_message_retention_days              = 5

# Application parameters
NODE_ENV                                             = "development"
MULESOFT_URL                                         = "https://apis-hml.portoseguro.com.br"
SENSEDIA_URL                                         = "https://portoapi-hml.portoseguro.com.br"
SENSEDIA_CLOUD_URL                                   = "https://portoapicloud-hml.portoseguro.com.br"
SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_ORGNAME   = "CLIENTES_HML"
SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_ORGNAME = "CLIENTES_HML"