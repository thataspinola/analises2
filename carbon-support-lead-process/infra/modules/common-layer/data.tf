# ------------------------------------------------
# LAMBDA LAYER ARCHIVE
# ------------------------------------------------
data "archive_file" "lambda_layer" {
  type        = "zip"
  source_dir  = "${path.root}/../app-common"
  output_path = "${path.root}/../app-common.zip"
  excludes = setunion(
    fileset("${path.root}/../app-common/", "__test__/**/*.*"),
    fileset("${path.root}/../app-common/", "coverage/**/*.*"),
    [
      "jest.config.js",
      "localRunner.js"
    ]
  )
}