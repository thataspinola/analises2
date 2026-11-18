# -----------------------------------------------------------------
# DEV TFVARS
# -----------------------------------------------------------------

# General terraform parameters
account_id                      = "791702935403"
vpce                            = ["vpce-0b153819c7c85b104"]
vpc_subnet_ids                  = ["subnet-0980faf0e7fb2eb9c", "subnet-0feb3b5de4683cfe3", "subnet-03ad7b8e74ba97103"]
vpc_security_group_id           = ["sg-0ad1f2aac66e82610"]
lambda_timeout                  = 29
lambda_cloudwatch_log_retention = 14
dlq_message_retention_days      = 5

# Project terraform parameters
process_lambda_maximum_retry_attempts                           = 3
check_inspection_request_queue_visibility_timeout_seconds       = 60
check_inspection_request_queue_message_delay_seconds            = 60

# Application parameters
inspection_status_gather_queue_individual_message_delay_seconds_first_day         = 120
inspection_status_gather_queue_individual_message_delay_seconds_second_day_beyond = 240
inspection_status_gather_queue_resend_message_days_threshold                      = 1
NODE_ENV                                                                          = "development"
SENSEDIACLOUD_URL                                                                 = "https://portoapicloud-hml.portoseguro.com.br"
SENSEDIA_URL                                                                      = "https://portoapi-hml.portoseguro.com.br"
PAYMENT_REGISTER_API_GATEWAY_STAGE_URL                                            = "https://8u6szid2ki.execute-api.ca-central-1.amazonaws.com/v1"
dynatrace_oneAgent_layer                                                          = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_287_2_20240223-044013_nodejs:1"
dynatrace_dt_tenant                                                               = ""
dynatrace_dt_cluster_id                                                           = ""
dynatrace_dt_connection_base_url                                                  = ""
dynatrace_open_telemetry_enable_integration                                       = ""
UP_TO_FIFTEEN_MINUTES                                                             = 15
UP_TO_TWENTY_FOUR_HOURS                                                           = 1140
MAX_LIMIT                                                                         = 8640
UP_TO_FIFTEEN_MINUTES_TTL                                                         = 2
UP_TO_TWENTY_FOUR_HOURS_TTL                                                       = 3
MAX_LIMIT_TTL                                                                     = 5
INSPECTION_REQUEST_AUTO_DLQ_URL                                                   = "https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-check-inspection-request-auto-dead-letter"