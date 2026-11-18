# -----------------------------------------------------------------
# PRD TFVARS
# -----------------------------------------------------------------

# Terraform parameters
account_id = "555961299972"
vpc_subnet_ids = ["subnet-0dc76cf898657bb77", "subnet-0d3e9c904157b1507"]
vpc_security_group_id = ["sg-0521d959217b19f68"]
vpce = ["vpce-09de2cf02823516aa"]
lambda_cloudwatch_log_retention = 60
lambda_timeout = 60
gateway_throttling_burst_limit = 5000
gateway_throttling_rate_limit = 10000

# Application parameters
NODE_ENV = "production"
TRAVEL_QUEUE = "https://sqs.ca-central-1.amazonaws.com/555961299972/carbon-acq-travel-transmission"
RESIDENTIAL_QUEUE = "https://sqs.ca-central-1.amazonaws.com/555961299972/carbon-acq-residential-transmission"