# ------------------------------------------------
# LAMBDA LAYER
# ------------------------------------------------
resource "aws_lambda_layer_version" "lambda_layer" {
  layer_name          = "${var.project_name}-common"
  compatible_runtimes = ["nodejs20.x"]
  filename            = data.archive_file.lambda_layer.output_path
  source_code_hash    = data.archive_file.lambda_layer.output_base64sha256
}
