# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----

# ---- WITHOUT Default Value ----
variable "queue_name" {
  type        = string
  description = "AWS SQS queue name"
}

variable "queue_dead_letter_arn" {
  type        = string
  description = "AWS SQS queue dead-letter ARN"
}

variable "queue_dead_letter_url" {
  type        = string
  description = "AWS SQS queue dead-letter URL"
}