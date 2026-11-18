# -----------------------------------------------------------------
# POC TFVARS
# -----------------------------------------------------------------

# General terraform parameters
account_id                      = "385020771841"
vpce                            = ["vpce-0224986cf48912f3c"]
vpc_subnet_ids                  = ["subnet-08042b24351d7291e", "subnet-06e29859b742a5142"]
vpc_security_group_id           = ["sg-0918bc7be0d05df35"]
lambda_timeout                  = 29
lambda_cloudwatch_log_retention = 3
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
PAYMENT_REGISTER_API_GATEWAY_STAGE_URL                                            = "https://teoxs4bt1c.execute-api.ca-central-1.amazonaws.com/v1"
dynatrace_oneAgent_layer                                                          = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_287_2_20240223-044013_nodejs:1"
dynatrace_dt_tenant                                                               = ""
dynatrace_dt_cluster_id                                                           = ""
dynatrace_dt_connection_base_url                                                  = ""
dynatrace_open_telemetry_enable_integration                                       = ""
UP_TO_FIFTEEN_MINUTES                                                             = 15
UP_TO_TWENTY_FOUR_HOURS                                                           = 1140
MAX_LIMIT                                                                         = 8640
UP_TO_FIFTEEN_MINUTES_TTL                                                         = 5
UP_TO_TWENTY_FOUR_HOURS_TTL                                                       = 60
MAX_LIMIT_TTL                                                                     = 360
INSPECTION_REQUEST_AUTO_DLQ_URL                                                   = "https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-check-inspection-request-auto-dead-letter"