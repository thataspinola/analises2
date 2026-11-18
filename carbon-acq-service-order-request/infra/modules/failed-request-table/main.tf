# -----------------------------------------------------------------
# DYNAMO_DB
# -----------------------------------------------------------------

resource "aws_dynamodb_table" "table" {
  name           = var.table_name
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "HPK" #Hash Partition Key
  range_key      = "RSK" #Range Sort Key
  stream_enabled = false

  server_side_encryption {
    enabled = true
  }

  attribute {
    name = "HPK"
    type = "S"
  }

  attribute {
    name = "RSK"
    type = "S"
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }
}
