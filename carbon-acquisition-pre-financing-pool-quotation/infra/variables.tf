# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----
variable "api_gateway_http_method" {
  type        = string
  description = "Gateway API HTTP method"
  default     = "POST"
}

variable "carbon_api_custom_domain_path" {
  type        = string
  description = "Carbon API Gateway custom domain path"
  default     = "pre-financing-pool-quotation"
}

variable "api_gateway_stage_name" {
  type        = string
  description = "Gateway API stage name"
  default     = "v1"
}
variable "project_name" {
  type        = string
  description = "project name"
  default     = "carbon-acquisition-pre-financing-pool-quotation"
}

variable "TWISTLOCK_DISABLED" {
  type        = bool
  description = "Indicates if Palo Alto Networks Defender Serverless need to be disabled"
  default     = false
}
variable "vpce_apigtw_id" {
  type        = string
  description = "AWS VPC Endpoint ID with Interface for api gateway"
}

variable "twistlock_layer_arn" {
  type        = string
  description = "arn da layer do twistlock"
}

variable "SENSEDIA_CORP_MIDDLEWARE_TOKEN_KEY" {
  type        = string
  description = "Sensedia Porto Corporative Api Gateway external carbon token key"
  default     = "INTERNAL_PORTOSEG_CONTA"
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
variable "SENSEDIA_CORP_INTERNAL_URL" {
  type        = string
  description = "Sensedia Porto Corporative Api Gateway external URL"
  default     = "https://portoapicloud-hml.portoseguro.brasil"
}

variable "vpc_id" {
  type        = string
  description = "AWS VPC ID"
}
variable "is_poc" {
  type        = bool
  description = "Indicates if the current server is proof of concept aimed (That lambda and related resources will not access coorporative network and internet)"
  default     = false
}
variable "carbon_token_layer_name" {
  type        = string
  description = "Hub de Vendas Carbon token generation AWS Lambda layer name"
  default     = "carbon_token_layer"
}

variable "carbon_token_layer_arn" {
  type        = string
  description = "Hub de Vendas Carbon token generation AWS Lambda layer name"
  default     = "carbon_token_layer"
}
# ---- WITHOUT Default Value ----

variable "NODE_ENV" {
  type        = string
  description = "standard NODE_ENV from Node.js"
}

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "dynatrace_aws_lambda_exec_wrapper" {
  type        = string
  description = "dynatrace_aws_lambda_exec_wrapper"
  default     = "/opt/dynatrace"
}

variable "dynatrace_oneAgent_layer" {
  type        = string
  description = "arn da layer do one agent do dynatrace"
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
variable "SENSEDIA_URL_CONSORCIO_INTERNO" {
  type        = string
  description = "Sensedia Gateway URL consórcio interno"
}
variable "SENSEDIA_URL_CONSORCIO_EXTERNO" {
  type        = string
  description = "Sensedia Gateway URL consórcio externo"
}

variable "SENSEDIA_URL" {
  type        = string
  description = "Sensedia Gateway URL"
}

variable "SENSEDIACLOUD_URL" {
  type        = string
  description = "Sensedia cloud url for api integration"
}

variable "APF_PORTOBANK_COTA_CONSORCIO_ENDPOINT_PATH" {
  type        = string
  description = "APF PortoBank Cota Consórcio endpoint path"
  default     = "data-porto-bank/cota-consorcio-ia/v1/cotas"
}

variable "gateway_throttling_burst_limit" {
  type        = number
  description = "API throttling burst limit"
}

variable "gateway_throttling_rate_limit" {
  type        = number
  description = "API throttling rate limit"
}

variable "carbon_api_custom_domain_fqn" {
  type        = string
  description = "Carbon API Gateway custom domain fully qualified name"
}

variable "lambda_max_memory_size" {
  type        = number
  default     = 512
  description = "Amount of memory in MB your Lambda Function can use at runtime"
}

variable "ENABLE_APP_DEBUG" {
  type        = bool
  description = "Enables adittional logging for debugging purposes"
  default     = false
}

variable "SENSEDIA_API_TIMEOUT" {
  type        = number
  description = "Sensedia timeout"
}

variable "lambda_vpc_security_group_name" {
  type        = string
  description = "Name of AWS VPC Security group that will be set in AWS lambda functions"
  default     = "security-group-hub-vendas-token-redis"
}
variable "TWISTLOCK_POLICY" {
  type        = string
  description = "Palo Alto Networks Defender Serverless policy"
}