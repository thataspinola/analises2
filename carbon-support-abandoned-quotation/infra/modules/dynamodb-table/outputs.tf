# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

output "table_arn" {
  value = aws_dynamodb_table.table.arn
}

output "table_name" {
  value = aws_dynamodb_table.table.name
}

output "table_stream_arn" {
  value = aws_dynamodb_table.table.stream_arn
}