# -----------------------------------------------------------------
# DYNAMO_DB
# -----------------------------------------------------------------

resource "aws_dynamodb_table" "table" {
  name           = var.PRE_FINANCING_LEAD_DATA_CACHE_TABLE_NAME
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "VDO_CODE" #Hash Partition Key
  range_key      = "BRANCH_ID" #Range Sort Key
  stream_enabled = false

  attribute {
    name = "VDO_CODE"
    type = "S"
  }

  attribute {
    name = "BRANCH_ID"
    type = "S"
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }

  server_side_encryption {
    enabled     = true
  }
}
