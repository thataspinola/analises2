data "aws_lambda_layer_version" "common_layer" {
  layer_name = var.common_layer_name
}
