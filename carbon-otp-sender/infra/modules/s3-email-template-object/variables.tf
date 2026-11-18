variable "email_templates_s3_bucket_name" {
  type        = string
  description = "S3 bucket name where email templates are stored"
}
variable "email_templates_source_file_path" {
  type        = string
  description = "Edge template file path for email send"
}