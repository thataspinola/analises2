# -----------------------------------------------------------------
# API GATEWAY
# -----------------------------------------------------------------

resource "aws_api_gateway_rest_api" "api_gateway_checkout_processor" {
    name = "carbon-acq-transmission"
    endpoint_configuration {
        types = ["PRIVATE"]
        vpc_endpoint_ids = var.vpce
    }
}

data "aws_iam_policy_document" "carbon_acquisition_transmission_gateway_rest_api_policy_doc" {
  statement {
    actions = [ "execute-api:Invoke" ]
    principals {
      type = "*"
      identifiers = ["*"]
    }
    resources = [ "execute-api:/${var.stage_name}/${var.http_method}/${var.path_part}" ]
  }
}

resource "aws_api_gateway_rest_api_policy" "carbon_acquisition_transmission_gateway_rest_api_policy" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway_checkout_processor.id
  policy = data.aws_iam_policy_document.carbon_acquisition_transmission_gateway_rest_api_policy_doc.json
  depends_on = [ 
    aws_api_gateway_rest_api.api_gateway_checkout_processor,
    data.aws_iam_policy_document.carbon_acquisition_transmission_gateway_rest_api_policy_doc
  ]
}

resource "aws_api_gateway_resource" "carbon_acquisition_transmission_gateway_rest_api_resource" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway_checkout_processor.id
  parent_id = aws_api_gateway_rest_api.api_gateway_checkout_processor.root_resource_id
  path_part = "${var.path_part}"
  depends_on = [ 
    aws_api_gateway_rest_api.api_gateway_checkout_processor,
  ]
}

resource "aws_api_gateway_method" "carbon_acquisition_transmission_gateway_rest_api_method" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway_checkout_processor.id
  resource_id = aws_api_gateway_resource.carbon_acquisition_transmission_gateway_rest_api_resource.id
  http_method = "${var.http_method}"
  authorization = "NONE"
  depends_on = [ 
    aws_api_gateway_rest_api.api_gateway_checkout_processor,
    aws_api_gateway_resource.carbon_acquisition_transmission_gateway_rest_api_resource
  ]
}

resource "aws_api_gateway_integration" "carbon_acquisition_transmission_gateway_rest_api_integration" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway_checkout_processor.id
  resource_id = aws_api_gateway_resource.carbon_acquisition_transmission_gateway_rest_api_resource.id
  http_method = aws_api_gateway_method.carbon_acquisition_transmission_gateway_rest_api_method.http_method

  integration_http_method = "${var.http_method}"
  type = "AWS_PROXY"
  uri = var.carbon_acquisition_transmission_lambda_invoke_arn

  depends_on = [ 
    aws_api_gateway_rest_api.api_gateway_checkout_processor,
    aws_api_gateway_resource.carbon_acquisition_transmission_gateway_rest_api_resource,
    aws_api_gateway_method.carbon_acquisition_transmission_gateway_rest_api_method
  ]
}

resource "aws_api_gateway_deployment" "carbon_acquisition_transmission_gateway_rest_api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway_checkout_processor.id

  lifecycle {
    create_before_destroy = true
  }

  triggers = {
    redeployment = sha1(jsonencode([
      data.aws_iam_policy_document.carbon_acquisition_transmission_gateway_rest_api_policy_doc.json,
      var.stage_name,
      var.http_method,
      var.path_part
    ]))
  }

  depends_on = [ 
    aws_api_gateway_rest_api.api_gateway_checkout_processor,
    aws_api_gateway_rest_api_policy.carbon_acquisition_transmission_gateway_rest_api_policy,
    aws_api_gateway_resource.carbon_acquisition_transmission_gateway_rest_api_resource,
    aws_api_gateway_method.carbon_acquisition_transmission_gateway_rest_api_method,
    aws_api_gateway_integration.carbon_acquisition_transmission_gateway_rest_api_integration
  ]
}

resource "aws_api_gateway_stage" "carbon_acquisition_transmission_gateway_rest_api_stage" {
  stage_name = "${var.stage_name}"
  rest_api_id = aws_api_gateway_rest_api.api_gateway_checkout_processor.id
  deployment_id = aws_api_gateway_deployment.carbon_acquisition_transmission_gateway_rest_api_deployment.id

  depends_on = [ 
    aws_api_gateway_rest_api.api_gateway_checkout_processor,
    aws_api_gateway_deployment.carbon_acquisition_transmission_gateway_rest_api_deployment
  ]
}

resource "aws_api_gateway_method_settings" "carbon_acquisition_transmission_gateway_rest_api_method_settings" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway_checkout_processor.id
  stage_name = aws_api_gateway_stage.carbon_acquisition_transmission_gateway_rest_api_stage.stage_name
  method_path = "${var.path_part}/${var.http_method}"

  settings {
    logging_level = "INFO"
    data_trace_enabled = true
    metrics_enabled = true
    throttling_burst_limit = var.throttling_burst_limit
    throttling_rate_limit = var.throttling_rate_limit
  }

  depends_on = [ 
    aws_api_gateway_rest_api.api_gateway_checkout_processor,
    aws_api_gateway_stage.carbon_acquisition_transmission_gateway_rest_api_stage
  ]
}
