# # ------------------------------------------------
# # INPUTS
# # ------------------------------------------------

variable "vpc_subnet_ids" {
  type = list(string)
}

variable "vpc_security_group_ids" {
  type = list(string)
}