
# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

variable "bucket_name" {
  type        = string
  description = "Bucket name of s3"
}

variable "process_lambda_role_arn" {
  type        = string
  description = "Arn of process lambda role"
}