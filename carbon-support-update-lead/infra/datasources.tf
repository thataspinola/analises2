data "aws_caller_identity" "current" {}
data "aws_subnets" "cur_subnets" {
  filter {
    name   = "vpc-id"
    values = [var.vpc_id]
  }

  filter {
    name   = "state"
    values = ["available"]
  }

  filter {
    name   = "tag:Name"
    values = var.vpc_subnet_name_tag_value_list
  }
}

data "aws_subnet" "cur_subnets" {
  for_each = toset(data.aws_subnets.cur_subnets.ids)
  id       = each.value
}

data "aws_security_group" "lambda" {
  name = var.lambda_vpc_security_group_name
}

data "aws_secretsmanager_secret" "secrets" {
  name = "HUB-VENDAS-MIDDLEWARE-SECRETS"
}

data "aws_secretsmanager_secret_version" "secrets_version" {
  secret_id = data.aws_secretsmanager_secret.secrets.id
}

data "aws_vpc_endpoint" "api-gateway-vpce" {
  vpc_id       = var.vpc_id
  id           = var.vpce_apigtw_id
  service_name = "com.amazonaws.ca-central-1.execute-api"
  state        = "available"
}


data "aws_lambda_layer_version" "carbon_token" {
  layer_name = var.carbon_token_layer_name
}

data "aws_lambda_layer_version" "dynamics" {
  layer_name = var.dynamics_layer_name
}

data "aws_sfn_state_machine" "travel_proposal" {
  name = var.travel_proposal_step_function_name
}

data "aws_dynamodb_table" "lead_in_progress" {
  name = var.lead_in_progress_dynamodb_table_name
}
