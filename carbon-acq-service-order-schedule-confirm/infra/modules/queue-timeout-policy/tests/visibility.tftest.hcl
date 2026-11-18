variables {
  lambda_timeout_seconds     = 30
  visibility_timeout_seconds = 180
}

run "dev_configuration" {
  command = plan
  variables {
    lambda_timeout_seconds     = tonumber(regex("(?m)^lambda_timeout[[:space:]]*=[[:space:]]*([0-9]+)", file("../../dev.tfvars"))[0])
    visibility_timeout_seconds = tonumber(regex("(?m)^queue_visibility_timeout_seconds[[:space:]]*=[[:space:]]*([0-9]+)", file("../../dev.tfvars"))[0])
  }
  assert {
    condition     = output.visibility_timeout_seconds == var.visibility_timeout_seconds && output.visibility_timeout_seconds >= 6 * var.lambda_timeout_seconds
    error_message = "Real DEV settings must satisfy the queue visibility policy."
  }
}

run "hml_configuration" {
  command = plan
  variables {
    lambda_timeout_seconds     = tonumber(regex("(?m)^lambda_timeout[[:space:]]*=[[:space:]]*([0-9]+)", file("../../hml.tfvars"))[0])
    visibility_timeout_seconds = tonumber(regex("(?m)^queue_visibility_timeout_seconds[[:space:]]*=[[:space:]]*([0-9]+)", file("../../hml.tfvars"))[0])
  }
  assert {
    condition     = output.visibility_timeout_seconds == var.visibility_timeout_seconds && output.visibility_timeout_seconds >= 6 * var.lambda_timeout_seconds
    error_message = "Real HML settings must satisfy the queue visibility policy."
  }
}

run "poc_configuration" {
  command = plan
  variables {
    lambda_timeout_seconds     = tonumber(regex("(?m)^lambda_timeout[[:space:]]*=[[:space:]]*([0-9]+)", file("../../poc.tfvars"))[0])
    visibility_timeout_seconds = tonumber(regex("(?m)^queue_visibility_timeout_seconds[[:space:]]*=[[:space:]]*([0-9]+)", file("../../poc.tfvars"))[0])
  }
  assert {
    condition     = output.visibility_timeout_seconds == var.visibility_timeout_seconds && output.visibility_timeout_seconds >= 6 * var.lambda_timeout_seconds
    error_message = "Real POC settings must satisfy the queue visibility policy."
  }
}

run "prd_configuration" {
  command = plan
  variables {
    lambda_timeout_seconds     = tonumber(regex("(?m)^lambda_timeout[[:space:]]*=[[:space:]]*([0-9]+)", file("../../prd.tfvars"))[0])
    visibility_timeout_seconds = tonumber(regex("(?m)^queue_visibility_timeout_seconds[[:space:]]*=[[:space:]]*([0-9]+)", file("../../prd.tfvars"))[0])
  }
  assert {
    condition     = output.visibility_timeout_seconds == var.visibility_timeout_seconds && output.visibility_timeout_seconds >= 6 * var.lambda_timeout_seconds
    error_message = "Real PRD settings must satisfy the queue visibility policy."
  }
}

run "reject_old_25_30" {
  command = plan
  variables {
    lambda_timeout_seconds     = 25
    visibility_timeout_seconds = 30
  }
  expect_failures = [output.visibility_timeout_seconds]
}

run "reject_old_29_30" {
  command = plan
  variables {
    lambda_timeout_seconds     = 29
    visibility_timeout_seconds = 30
  }
  expect_failures = [output.visibility_timeout_seconds]
}

run "reject_old_30_30" {
  command = plan
  variables {
    lambda_timeout_seconds     = 30
    visibility_timeout_seconds = 30
  }
  expect_failures = [output.visibility_timeout_seconds]
}

run "reject_below_margin" {
  command = plan
  variables {
    lambda_timeout_seconds     = 30
    visibility_timeout_seconds = 179
  }
  expect_failures = [output.visibility_timeout_seconds]
}

run "accept_boundary" {
  command = plan
  variables {
    lambda_timeout_seconds     = 30
    visibility_timeout_seconds = 180
  }
  assert {
    condition     = output.visibility_timeout_seconds == 180
    error_message = "A valid visibility timeout must be preserved."
  }
}

run "accept_above_margin" {
  command = plan
  variables {
    lambda_timeout_seconds     = 30
    visibility_timeout_seconds = 181
  }
  assert {
    condition     = output.visibility_timeout_seconds == 181
    error_message = "A valid visibility timeout must be preserved."
  }
}

run "accept_maximum_values" {
  command = plan
  variables {
    lambda_timeout_seconds     = 900
    visibility_timeout_seconds = 43200
  }
  assert {
    condition     = output.visibility_timeout_seconds == 43200
    error_message = "A valid visibility timeout must be preserved."
  }
}

run "reject_zero_lambda" {
  command = plan
  variables {
    lambda_timeout_seconds     = 0
    visibility_timeout_seconds = 180
  }
  expect_failures = [var.lambda_timeout_seconds]
}

run "reject_large_lambda" {
  command = plan
  variables {
    lambda_timeout_seconds     = 901
    visibility_timeout_seconds = 6000
  }
  expect_failures = [var.lambda_timeout_seconds]
}

run "reject_fractional_lambda" {
  command = plan
  variables {
    lambda_timeout_seconds     = 29.5
    visibility_timeout_seconds = 180
  }
  expect_failures = [var.lambda_timeout_seconds]
}

run "reject_negative_visibility" {
  command = plan
  variables {
    lambda_timeout_seconds     = 30
    visibility_timeout_seconds = -1
  }
  expect_failures = [var.visibility_timeout_seconds]
}

run "reject_large_visibility" {
  command = plan
  variables {
    lambda_timeout_seconds     = 30
    visibility_timeout_seconds = 43201
  }
  expect_failures = [var.visibility_timeout_seconds]
}

run "reject_fractional_visibility" {
  command = plan
  variables {
    lambda_timeout_seconds     = 30
    visibility_timeout_seconds = 180.5
  }
  expect_failures = [var.visibility_timeout_seconds]
}

run "production_wiring" {
  command = plan
  assert {
    condition = (
      output.visibility_timeout_seconds >= 6 * var.lambda_timeout_seconds &&
      length(regexall("message_visibility_timeout_seconds[[:space:]]*=[[:space:]]*module\\.queue_timeout_policy\\.visibility_timeout_seconds", file("../../main.tf"))) == 2 &&
      can(regex("lambda_timeout_seconds[[:space:]]*=[[:space:]]*var\\.lambda_timeout", file("../../main.tf"))) &&
      can(regex("visibility_timeout_seconds[[:space:]]*=[[:space:]]*var\\.queue_visibility_timeout_seconds", file("../../main.tf"))) &&
      length(regexall("timeout[[:space:]]*=[[:space:]]*var\\.lambda_timeout", file("../../main.tf"))) == 1 &&
      length(regexall("maximum_batching_window_in_seconds", file("../lambda-event-source/main.tf"))) == 0 &&
      can(regex("visibility_timeout_seconds[[:space:]]*=[[:space:]]*var\\.message_visibility_timeout_seconds", file("../queue/main.tf")))
    )
    error_message = "Production queues must use the validated value and matching Lambda timeout. A new batching window requires updating this policy."
  }
}
