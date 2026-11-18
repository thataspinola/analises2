# -----------------------------------------------------------------
# POC TFVARS
# -----------------------------------------------------------------

# Terraform parameters
account_id                      = "385020771841"
vpce                            = ["vpce-0224986cf48912f3c"]
gateway_throttling_burst_limit  = 5000
gateway_throttling_rate_limit   = 10000
token_layer_name                = "carbon_token_layer"
vpc_subnet_ids                  = ["subnet-08042b24351d7291e", "subnet-06e29859b742a5142"]
vpc_security_group_id           = ["sg-0918bc7be0d05df35"]
lambda_timeout                  = 29
lambda_cloudwatch_log_retention = 3

# Application parameters
NODE_ENV     = "development"
COMMERCE_URL = "https://ecom-stage.portoseguro.com.br"
MULESOFT_URL = "https://apis-hml.portoseguro.com.br"

