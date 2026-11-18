# -----------------------------------------------------------------
# HML TFVARS
# -----------------------------------------------------------------

# General terraform parameters
account_id                      = "372926067604"
vpce                            = ["vpce-01439860599832be9"]
vpc_subnet_ids                  = ["subnet-02b948710579be1e4", "subnet-09b81f3d7c4c3a90c", "subnet-03d0b9aaa0b4a57ca"]
vpc_security_group_id           = ["sg-092a9370a4841a36c"]
lambda_timeout                  = 60
lambda_cloudwatch_log_retention = 60
dlq_message_retention_days      = 5

# Project terraform parameters
process_lambda_maximum_retry_attempts                           = 3
check_inspection_request_queue_visibility_timeout_seconds       = 60
check_inspection_request_queue_message_delay_seconds            = 180

# Application parameters
inspection_status_gather_queue_individual_message_delay_seconds_first_day         = 120
inspection_status_gather_queue_individual_message_delay_seconds_second_day_beyond = 240
inspection_status_gather_queue_resend_message_days_threshold                      = 1
NODE_ENV                                                                          = "stage"
SENSEDIACLOUD_URL                                                                 = "https://portoapicloud-hml.portoseguro.com.br"
SENSEDIA_URL                                                                      = "https://portoapi-hml.portoseguro.com.br"
PAYMENT_REGISTER_API_GATEWAY_STAGE_URL                                            = "https://6p7d489x9g.execute-api.ca-central-1.amazonaws.com/v1"
dynatrace_oneAgent_layer                                                          = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_289_2_20240322-044523_with_collector_nodejs:1"
dynatrace_dt_tenant                                                               = "tpz78812"
dynatrace_dt_cluster_id                                                           = "2006102186"
dynatrace_dt_connection_base_url                                                  = "https://tpz78812.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration                                       = "true"
UP_TO_FIFTEEN_MINUTES                                                             = 15
UP_TO_TWENTY_FOUR_HOURS                                                           = 1140
MAX_LIMIT                                                                         = 8640
UP_TO_FIFTEEN_MINUTES_TTL                                                         = 5
UP_TO_TWENTY_FOUR_HOURS_TTL                                                       = 60
MAX_LIMIT_TTL                                                                     = 360
INSPECTION_REQUEST_AUTO_DLQ_URL                                                   = "https://sqs.ca-central-1.amazonaws.com/372926067604/carbon-check-inspection-request-auto-dead-letter"