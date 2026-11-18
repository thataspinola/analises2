# -----------------------------------------------------------------
# DYNAMO_DB
# -----------------------------------------------------------------

resource "aws_dynamodb_table" "table" {
  name             = var.table_name
  billing_mode     = "PAY_PER_REQUEST"
  hash_key         = "HPK" #Hash Partition Key
  range_key        = "RSK" #Range Sort Key
  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  attribute {
    name = "HPK"
    type = "S"
  }

  attribute {
    name = "RSK"
    type = "S"
  }

  ttl {
    attribute_name = "expireAt"
    enabled        = true
  }
}