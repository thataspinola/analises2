# -----------------------------------------------------------------
# DYNAMO_DB
# -----------------------------------------------------------------

resource "aws_dynamodb_table" "deals_table" {
  name         = var.DEALS_TABLE
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "document"
  range_key    = "scope"

  attribute {
    name = "document"
    type = "S"
  }

  attribute {
    name = "scope"
    type = "S"
  }

  ttl {
    attribute_name = "TTL"
    enabled        = true
  }

  server_side_encryption {
    enabled = true
  }
}

