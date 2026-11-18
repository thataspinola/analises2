# ------------------------------------------------
# LAMBDA LAYER ARCHIVE
# ------------------------------------------------
data "archive_file" "lambda_layer" {
  type        = "zip"
  source_dir  = "${path.root}/../app-common"
  output_path = "${path.root}/../app-common.zip"
  excludes = setunion(
    fileset("${path.root}/../app/", "__test__/**/*.*"),
    fileset("${path.root}/../app/", "coverage/**/*.*"),
    [
      "jest.config.js",
      "localRunner.js"
    ]
  )
}

# ------------------------------------------------
# LAMBDA LAYER
# ------------------------------------------------
resource "aws_lambda_layer_version" "lambda_layer" {
  layer_name          = "carbon-acq-pre-financing-pool-direct-contact-common-layer"
  compatible_runtimes = ["nodejs20.x"]
  filename            = data.archive_file.lambda_layer.output_path
  source_code_hash    = data.archive_file.lambda_layer.output_base64sha256
}
