resource "aws_sns_topic" "topic" {
  name = var.topic_name
  kms_master_key_id = "alias/aws/sns"
  delivery_policy = templatefile(
    "${path.module}/topic-delivery-policy.tftpl",
    {
      "retryPolicyMinDelayTarget" : var.topic_delivery_policy_retrypolicy_mindelaytarget,
      "retryPolicyMaxDelayTarget" : var.topic_delivery_policy_retrypolicy_maxdelayTarget,
      "retryPolicyNumRetries" : var.topic_delivery_policy_retrypolicy_numretries,
      "retryPolicyNumMaxDelayRetries" : var.topic_delivery_policy_retrypolicy_nummaxdelayretries,
      "retryPolicyNumNoDelayRetries" : var.topic_delivery_policy_retrypolicy_numnodelayretries,
      "retryPolicyNumMinDelayRetries" : var.topic_delivery_policy_retrypolicy_nummindelayretries,
      "retryPolicyBackoffFunction" : "${var.topic_delivery_policy_retrypolicy_backofffunction}",
      "disableSubscriptionOverrides" : var.topic_delivery_policy_disablesubscriptionoverrides,
      "throttlePolicyMaxReceivesPerSecond" : var.topic_delivery_policy_throttlepolicy_maxreceivespersecond
    }
  )
}