# ----------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------

# ---- WITH Default Value ----
variable "topic_name" {
  type        = string
  description = "AWS SNS Topic name"
  default     = "carbon-acq-service-order-requested"
}

variable "topic_delivery_policy_retrypolicy_mindelaytarget" {
  type        = number
  description = "AWS SNS Topic delivery policy retry policy min delay target"
  default     = 20
}

variable "topic_delivery_policy_retrypolicy_maxdelayTarget" {
  type        = number
  description = "AWS SNS Topic delivery policy retry policy max delay target"
  default     = 20
}

variable "topic_delivery_policy_retrypolicy_numretries" {
  type        = number
  description = "AWS SNS Topic delivery policy retry policy number of retries"
  default     = 3
}

variable "topic_delivery_policy_retrypolicy_nummaxdelayretries" {
  type        = number
  description = "AWS SNS Topic delivery policy retry policy number of max delay retries"
  default     = 0
}

variable "topic_delivery_policy_retrypolicy_numnodelayretries" {
  type        = number
  description = "AWS SNS Topic delivery policy retry policy number of no delay retries"
  default     = 0
}

variable "topic_delivery_policy_retrypolicy_nummindelayretries" {
  type        = number
  description = "AWS SNS Topic delivery policy retry policy number of min delay retries"
  default     = 0
}

variable "topic_delivery_policy_retrypolicy_backofffunction" {
  type        = string
  description = "AWS SNS Topic delivery policy retry policy backoff function"
  default     = "linear"
}

variable "topic_delivery_policy_disablesubscriptionoverrides" {
  type        = bool
  description = "AWS SNS Topic delivery policy disable subscription overrides"
  default     = false
}

variable "topic_delivery_policy_throttlepolicy_maxreceivespersecond" {
  type        = number
  description = "AWS SNS Topic delivery policy throttle policy max receives per second"
  default     = 1
}

# ---- WITHOUT Default Value ----
