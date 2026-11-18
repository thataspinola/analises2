# -----------------------------------------------------------------
# PRD TFVARS
# -----------------------------------------------------------------

# General terraform parameters
account_id                      = "555961299972"
vpce                            = ["vpce-09de2cf02823516aa"]
vpc_subnet_ids                  = ["subnet-0dc76cf898657bb77", "subnet-0d3e9c904157b1507", "subnet-09da28ebcb50c4291"]
vpc_security_group_id           = ["sg-09efed82f39890ac0"]
lambda_timeout                  = 60
lambda_cloudwatch_log_retention = 400
dlq_message_retention_days      = 14

# Project terraform parameters
process_lambda_maximum_retry_attempts                           = 3
check_inspection_request_queue_visibility_timeout_seconds       = 60
check_inspection_request_queue_message_delay_seconds            = 120

# Application parameters
inspection_status_gather_queue_individual_message_delay_seconds_first_day         = 3600
inspection_status_gather_queue_individual_message_delay_seconds_second_day_beyond = 43200
inspection_status_gather_queue_resend_message_days_threshold                      = 15
NODE_ENV                                                                          = "production"
SENSEDIA_URL                                                                      = "https://portoapi.portoseguro.com.br"
SENSEDIACLOUD_URL                                                                 = "https://portoapicloud.portoseguro.com.br"
PAYMENT_REGISTER_API_GATEWAY_STAGE_URL                                            = "https://e02tvtzca3.execute-api.ca-central-1.amazonaws.com/v1"
dynatrace_oneAgent_layer                                                          = "arn:aws:lambda:ca-central-1:725887861453:layer:Dynatrace_OneAgent_1_289_2_20240322-044523_with_collector_nodejs:1"
dynatrace_dt_tenant                                                               = "nwr80289"
dynatrace_dt_cluster_id                                                           = "1372360960"
dynatrace_dt_connection_base_url                                                  = "https://nwr80289.live.dynatrace.com"
dynatrace_open_telemetry_enable_integration                                       = "true"
UP_TO_FIFTEEN_MINUTES                                                             = 15
UP_TO_TWENTY_FOUR_HOURS                                                           = 1140
MAX_LIMIT                                                                         = 14400
UP_TO_FIFTEEN_MINUTES_TTL                                                         = 5
UP_TO_TWENTY_FOUR_HOURS_TTL                                                       = 60
MAX_LIMIT_TTL                                                                     = 360
INSPECTION_REQUEST_AUTO_DLQ_URL                                                   = "https://sqs.ca-central-1.amazonaws.com/555961299972/carbon-check-inspection-request-auto-dead-letter"