# -----------------------------------------------------------------
# DYNAMO_DB
# -----------------------------------------------------------------

resource "aws_dynamodb_table" "dynamo_table" {
  name         = var.DYNAMODB_SEQUENCES_TABLE_NAME
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }

  server_side_encryption {
    enabled = true
  }
}
