# -----------------------------------------------------------------
# HML TFVARS
# -----------------------------------------------------------------

# Terraform parameters
account_id = "372926067604"
vpc_subnet_ids = ["subnet-02b948710579be1e4", "subnet-09b81f3d7c4c3a90c"]
vpc_security_group_id = ["sg-051fcdf8b99032c5a"]
vpce = ["vpce-01439860599832be9"]
lambda_cloudwatch_log_retention = 5
lambda_timeout = 60
gateway_throttling_burst_limit = 5000
gateway_throttling_rate_limit = 10000

# Application parameters
NODE_ENV = "development"
TRAVEL_QUEUE = "https://sqs.ca-central-1.amazonaws.com/372926067604/carbon-acq-travel-transmission"
RESIDENTIAL_QUEUE = "https://sqs.ca-central-1.amazonaws.com/372926067604/carbon-acq-residential-transmission"
