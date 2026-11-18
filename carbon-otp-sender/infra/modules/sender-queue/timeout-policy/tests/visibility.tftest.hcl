# Tests the actual timeout policy without AWS providers, credentials or state.

run "accept_dev_configuration" {
  command = plan

  variables {
    lambda_timeout_seconds     = tonumber(regex("(?m)^lambda_timeout_sender[[:space:]]*=[[:space:]]*([0-9]+)", file("../../../dev.tfvars"))[0])
    visibility_timeout_seconds = tonumber(regex("(?m)^sender_queue_visibility_timeout_seconds[[:space:]]*=[[:space:]]*([0-9]+)", file("../../../dev.tfvars"))[0])
  }

  assert {
    condition     = output.visibility_timeout_seconds == var.visibility_timeout_seconds
    error_message = "The queue must use the validated visibility timeout."
  }

  assert {
    condition     = output.visibility_timeout_seconds >= 6 * var.lambda_timeout_seconds
    error_message = "The visibility timeout must cover six sender Lambda timeouts."
  }
}

run "accept_hml_configuration" {
  command = plan

  variables {
    lambda_timeout_seconds     = tonumber(regex("(?m)^lambda_timeout_sender[[:space:]]*=[[:space:]]*([0-9]+)", file("../../../hml.tfvars"))[0])
    visibility_timeout_seconds = tonumber(regex("(?m)^sender_queue_visibility_timeout_seconds[[:space:]]*=[[:space:]]*([0-9]+)", file("../../../hml.tfvars"))[0])
  }

  assert {
    condition     = output.visibility_timeout_seconds == var.visibility_timeout_seconds
    error_message = "The queue must use the validated visibility timeout."
  }

  assert {
    condition     = output.visibility_timeout_seconds >= 6 * var.lambda_timeout_seconds
    error_message = "The visibility timeout must cover six sender Lambda timeouts."
  }
}

run "accept_poc_configuration" {
  command = plan

  variables {
    lambda_timeout_seconds     = tonumber(regex("(?m)^lambda_timeout_sender[[:space:]]*=[[:space:]]*([0-9]+)", file("../../../poc.tfvars"))[0])
    visibility_timeout_seconds = tonumber(regex("(?m)^sender_queue_visibility_timeout_seconds[[:space:]]*=[[:space:]]*([0-9]+)", file("../../../poc.tfvars"))[0])
  }

  assert {
    condition     = output.visibility_timeout_seconds == var.visibility_timeout_seconds
    error_message = "The queue must use the validated visibility timeout."
  }

  assert {
    condition     = output.visibility_timeout_seconds >= 6 * var.lambda_timeout_seconds
    error_message = "The visibility timeout must cover six sender Lambda timeouts."
  }
}

run "accept_prd_configuration" {
  command = plan

  variables {
    lambda_timeout_seconds     = tonumber(regex("(?m)^lambda_timeout_sender[[:space:]]*=[[:space:]]*([0-9]+)", file("../../../prd.tfvars"))[0])
    visibility_timeout_seconds = tonumber(regex("(?m)^sender_queue_visibility_timeout_seconds[[:space:]]*=[[:space:]]*([0-9]+)", file("../../../prd.tfvars"))[0])
  }

  assert {
    condition     = output.visibility_timeout_seconds == var.visibility_timeout_seconds
    error_message = "The queue must use the validated visibility timeout."
  }

  assert {
    condition     = output.visibility_timeout_seconds >= 6 * var.lambda_timeout_seconds
    error_message = "The visibility timeout must cover six sender Lambda timeouts."
  }
}

run "reject_legacy_dev" {
  command = plan

  variables {
    lambda_timeout_seconds     = 120
    visibility_timeout_seconds = 60
  }

  expect_failures = [output.visibility_timeout_seconds]
}

run "reject_legacy_poc" {
  command = plan

  variables {
    lambda_timeout_seconds     = 90
    visibility_timeout_seconds = 90
  }

  expect_failures = [output.visibility_timeout_seconds]
}

run "reject_legacy_prd" {
  command = plan

  variables {
    lambda_timeout_seconds     = 90
    visibility_timeout_seconds = 14
  }

  expect_failures = [output.visibility_timeout_seconds]
}

run "reject_just_above_lambda_timeout" {
  command = plan

  variables {
    lambda_timeout_seconds     = 90
    visibility_timeout_seconds = 91
  }

  expect_failures = [output.visibility_timeout_seconds]
}

run "reject_below_six_times" {
  command = plan

  variables {
    lambda_timeout_seconds     = 90
    visibility_timeout_seconds = 539
  }

  expect_failures = [output.visibility_timeout_seconds]
}

run "accept_exact_six_times" {
  command = plan

  variables {
    lambda_timeout_seconds     = 90
    visibility_timeout_seconds = 540
  }

  assert {
    condition     = output.visibility_timeout_seconds == var.visibility_timeout_seconds
    error_message = "The queue must use the validated visibility timeout."
  }

  assert {
    condition     = output.visibility_timeout_seconds >= 6 * var.lambda_timeout_seconds
    error_message = "The visibility timeout must cover six sender Lambda timeouts."
  }
}

run "accept_more_than_six_times" {
  command = plan

  variables {
    lambda_timeout_seconds     = 90
    visibility_timeout_seconds = 600
  }

  assert {
    condition     = output.visibility_timeout_seconds == var.visibility_timeout_seconds
    error_message = "The queue must use the validated visibility timeout."
  }

  assert {
    condition     = output.visibility_timeout_seconds >= 6 * var.lambda_timeout_seconds
    error_message = "The visibility timeout must cover six sender Lambda timeouts."
  }
}

run "accept_maximum_queue_visibility" {
  command = plan

  variables {
    lambda_timeout_seconds     = 900
    visibility_timeout_seconds = 43200
  }

  assert {
    condition     = output.visibility_timeout_seconds == var.visibility_timeout_seconds
    error_message = "The queue must use the validated visibility timeout."
  }

  assert {
    condition     = output.visibility_timeout_seconds >= 6 * var.lambda_timeout_seconds
    error_message = "The visibility timeout must cover six sender Lambda timeouts."
  }
}

run "reject_out_of_range_queue_visibility" {
  command = plan

  variables {
    lambda_timeout_seconds     = 90
    visibility_timeout_seconds = 43201
  }

  expect_failures = [var.visibility_timeout_seconds]
}

run "reject_fractional_queue_visibility" {
  command = plan

  variables {
    lambda_timeout_seconds     = 90
    visibility_timeout_seconds = 540.5
  }

  expect_failures = [var.visibility_timeout_seconds]
}

run "reject_invalid_lambda_timeout" {
  command = plan

  variables {
    lambda_timeout_seconds     = 901
    visibility_timeout_seconds = 6000
  }

  expect_failures = [var.lambda_timeout_seconds]
}

