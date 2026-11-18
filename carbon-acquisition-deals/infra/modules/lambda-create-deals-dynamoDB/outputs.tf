# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

output "table_arn" {
  value = aws_dynamodb_table.deals_table.arn
}

output "table_name" {
  value = aws_dynamodb_table.deals_table.name
}

