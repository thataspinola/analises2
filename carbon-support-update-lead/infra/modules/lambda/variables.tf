# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----

# ---- WITHOUT Default Value ----
variable "carbon_token_layer_arn" {
  type        = string
  description = "Hub de Vendas Carbon AWS Lambda layer ARN"
}

variable "is_poc" {
  type        = bool
  description = "Indicates if the current server is proof of concept aimed (That lambda and related resources will not access coorporative network and internet)"
}

variable "project_name" {
  type        = string
  description = "project name"
}

variable "account_id" {
  type        = string
  description = "AWS account ID"
}


variable "vpc_subnet_ids" {
  type = list(string)
}

variable "vpc_security_groups_ids" {
  type = list(string)
}


variable "NODE_ENV" {
  type        = string
  description = "standard NODE_ENV from Node.js"
}

variable "SENSEDIA_URL" {
  type        = string
  description = "Sensedia Gateway URL"
}

variable "timeout" {
  type        = number
  description = "Lambda timeout"
}

variable "max_memory_size" {
  type        = string
  description = "Amount of memory in MB your Lambda Function can use at runtime"
}

variable "cloudwatch_log_retention" {
  type        = number
  description = "Lambda cloudwatch log retention in days"
}

variable "dynamics_layer_arn" {
  type        = string
  description = "Dynamics layer ARN"
}

variable "dynatrace_oneAgent_layer_arn" {
  type        = string
  description = "arn da layer do one agent do dynatrace"
}

variable "DYNATRACE_AWS_LAMBDA_EXEC_WRAPPER" {
  type        = string
  description = "dynatrace_aws_lambda_exec_wrapper"
}

variable "DYNATRACE_DT_TENANT" {
  type        = string
  description = "host do ambiente do dynatrace"
}

variable "DYNATRACE_DT_CLUSTER_ID" {
  type        = string
  description = "dynatrace cluster id"
}

variable "DYNATRACE_DT_CONNECTION_BASE_URL" {
  type        = string
  description = "dynatrace connection base url"
}

variable "DYNATRACE_DT_CONNECTION_AUTH_TOKEN" {
  type        = string
  description = "dynatrace connection auth token"
}

variable "DYNATRACE_DT_LOG_COLLECTION_AUTH_TOKEN" {
  type        = string
  description = "dynatrace log collection auth token"
}

variable "DYNATRACE_DT_OPEN_TELEMETRY_ENABLE_INTEGRATION" {
  type        = string
  description = "dynatrace open telemetry enable integration"
}

variable "twistlock_layer_arn" {
  type        = string
  description = "arn da layer do twistlock"
}

variable "TWISTLOCK_DISABLED" {
  type        = bool
  description = "Indicates if Palo Alto Networks Defender Serverless need to be disabled"
}
variable "TWISTLOCK_POLICY" {
  type        = string
  description = "Palo Alto Networks Defender Serverless policy"
}

variable "lead_in_progress_dynamodb_table_arn" {
  type        = string
  description = "O ARN da tabela DynamoDB para armazenar leads em andamento."
}
