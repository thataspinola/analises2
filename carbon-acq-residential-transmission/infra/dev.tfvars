# -----------------------------------------------------------------
# DEV TFVARS
# -----------------------------------------------------------------

# Terraform parameters
account_id = "791702935403"
vpc_subnet_ids = ["subnet-0980faf0e7fb2eb9c", "subnet-0feb3b5de4683cfe3"]
vpc_security_group_id = ["sg-02a06a09c4938a9b7", "sg-0f67180223d71da0e"]
vpce = ["vpce-0b153819c7c85b104"]
lambda_cloudwatch_log_retention = 3
lambda_timeout = 60
gateway_throttling_burst_limit = 5000
gateway_throttling_rate_limit = 10000

# Application parameters
NODE_ENV = "development"
TRAVEL_QUEUE = "https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-acq-travel-transmission"
RESIDENTIAL_QUEUE = "https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-acq-residential-transmission"