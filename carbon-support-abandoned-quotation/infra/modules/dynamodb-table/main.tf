# -----------------------------------------------------------------
# DYNAMO_DB
# -----------------------------------------------------------------

resource "aws_dynamodb_table" "table" {
  name             = var.table_name
  billing_mode     = "PAY_PER_REQUEST"
  hash_key         = "vdoCode" #Hash Partition Key
  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"
  server_side_encryption {
    enabled = true
  }
  attribute {
    name = "vdoCode"
    type = "S"
  }

  ttl {
    attribute_name = "expireAt"
    enabled        = true
  }
}
