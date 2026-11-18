# ------------------------------------------------
# LAMBDA LAYER ARCHIVE
# ------------------------------------------------

data "archive_file" "layer_file" {
  type        = "zip"
  source_dir  = "${path.root}/../app-deals-data-layer"
  output_path = "${path.root}/../app-deals-data-layer.zip"
  excludes = setunion(
    fileset("${path.root}/../app-deals-data-layer/", "nodejs/carbon-acquisition-deals-common-layer/__test__/**/*.*"),
    fileset("${path.root}/../app/", "nodejs/carbon-acquisition-deals-common-layer/coverage/**/*.*"),
    [
      "nodejs/carbon-acquisition-deals-common-layer/jest.config.js",
    ]
  )
}

# ------------------------------------------------
# LAMBDA LAYER
# ------------------------------------------------

resource "aws_lambda_layer_version" "lambda_layer" {
  layer_name          = var.project_name
  compatible_runtimes = ["nodejs18.x"]
  filename            = data.archive_file.layer_file.output_path
  source_code_hash    = data.archive_file.layer_file.output_base64sha256
  skip_destroy        = true
}

