data "template_file" "queue_filter_policy" {
  template = file("${path.module}/filter_policy.json")
}