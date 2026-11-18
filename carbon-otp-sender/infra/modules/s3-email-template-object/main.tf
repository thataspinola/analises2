resource "aws_s3_object" "object" {
  bucket = var.email_templates_s3_bucket_name
  key    = "template/email-otp-message.edge"
  source = var.email_templates_source_file_path
  etag   = filemd5("${var.email_templates_source_file_path}")
}
