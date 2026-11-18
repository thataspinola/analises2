# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----
variable "carbon_token_layer_name" {
  type        = string
  description = "Hub de Vendas Carbon AWS Lambda layer name"
  default     = "carbon_token_layer"
}
variable "is_poc" {
  type        = bool
  description = "Indicates if the current server is proof of concept aimed (That lambda and related resources will not access coorporative network and internet)"
  default     = false
}
variable "AWS_REGION" {
  type        = string
  description = "AWS region"
  default     = "ca-central-1"
}

variable "lambda_vpc_security_group_name" {
  type        = string
  description = "Name of AWS VPC Security group that will be set in AWS lambda functions"
  default     = "security-group-hub-vendas-token-redis"
}

variable "vpc_subnet_name_tag_value_list" {
  type        = list(string)
  description = "List of name tag value of subnets that will be set in AWS lambda functions"
  default = [
    "portocom-priv-subnet-az1",
    "portocom-priv-subnet-az2",
    "portocom-priv-subnet-az4"
  ]
}

variable "api_gateway_http_method" {
  type        = string
  description = "Gateway API HTTP method"
  default     = "PUT"
}

variable "api_gateway_path_part" {
  type        = string
  description = "Gateway API path part"
  default     = "update-lead"
}

variable "api_gateway_stage_name" {
  type        = string
  description = "Gateway API stage name"
  default     = "v1"
}

variable "project_name" {
  type        = string
  description = "project name"
  default     = "carbon-support-update-lead"
}

variable "project_name_camel_case" {
  type        = string
  description = "project name"
  default     = "CarbonSupportUpdateLead"
}

variable "default_batch_size" {
  type        = number
  description = "Tamanho padrão do tamanho de batch de uma trigger"
  default     = 10
}

variable "default_maximum_concurrency" {
  type        = number
  description = "Tamanho padrão do maior número de concorrência de uma Lambda"
  default     = 5
}

variable "travel_proposal_step_function_name" {
  type        = string
  description = "nome da step function que publica na fila de update lead"
  default     = "carbon-acq-travel-proposal-workflow"
}

variable "lead_in_progress_dynamodb_table_name" {
  type        = string
  default     = "carbon-lead-in-progress"
  description = "O nome da tabela DynamoDB para aramazenar leads em andamento."
}

variable "dynatrace_aws_lambda_exec_wrapper" {
  type        = string
  description = "dynatrace_aws_lambda_exec_wrapper"
  default     = "/opt/dynatrace"
}

variable "TWISTLOCK_DISABLED" {
  type        = bool
  description = "Indicates if Palo Alto Networks Defender Serverless need to be disabled"
  default     = false
}

# ---- WITHOUT Default Value ----
variable "vpc_id" {
  type        = string
  description = "AWS VPC ID"
}

variable "vpce_apigtw_id" {
  type        = string
  description = "AWS VPC Endpoint ID with Interface for api gateway"
}

variable "dynatrace_oneAgent_layer_arn" {
  type        = string
  description = "arn da layer do one agent do dynatrace"
}

variable "twistlock_layer_arn" {
  type        = string
  description = "arn da layer do twistlock"
}

variable "dynatrace_dt_tenant" {
  type        = string
  description = "host do ambiente do dynatrace"
}

variable "dynatrace_dt_cluster_id" {
  type        = string
  description = "dynatrace cluster id"
}

variable "dynatrace_dt_connection_base_url" {
  type        = string
  description = "dynatrace connection base url"
}

variable "dynatrace_open_telemetry_enable_integration" {
  type        = string
  description = "dynatrace open telemetry enable integration"
}

variable "TWISTLOCK_POLICY" {
  type        = string
  description = "Palo Alto Networks Defender Serverless policy"
}

variable "NODE_ENV" {
  type        = string
  description = "standard NODE_ENV from Node.js"
}

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "carbon_api_custom_domain_fqn" {
  type        = string
  description = "Carbon API Gateway custom domain fully qualified name"
}

variable "cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "gateway_throttling_burst_limit" {
  type        = number
  description = "API throttling burst limit"
}

variable "gateway_throttling_rate_limit" {
  type        = number
  description = "API throttling rate limit"
}

variable "SENSEDIA_URL" {
  type        = string
  description = "Sensedia Gateway URL"
}

variable "dynamics_layer_name" {
  type        = string
  default     = "dynamics_lambda_layer"
  description = "Dynamics layer name"
}

variable "dlq_message_retention_days" {
  type        = string
  description = "DLQ message rentention in days"
}

variable "queue_visibility_timeout_seconds" {
  type        = string
  description = "queue visibility timeout in seconds"
}

variable "max_retry_lambda" {
  type        = number
  description = "Máximo de tentativas antes de enviar para DLQ"
}
variable "lambda_max_memory_size" {
  type        = number
  default     = 512
  description = "Amount of memory in MB your Lambda Function can use at runtime"
}
