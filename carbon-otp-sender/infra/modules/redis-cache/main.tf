resource "aws_elasticache_cluster" "elasticache_cluster" {
  cluster_id           = "carbon-otp-redis-cache"
  engine               = "redis"
  node_type            = "cache.t2.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  security_group_ids   = var.vpc_security_group_ids
  subnet_group_name    = aws_elasticache_subnet_group.elasticache_subnet.name
  port                 = 6379
}

resource "aws_elasticache_subnet_group" "elasticache_subnet" {
  name       = "carbon-otp-redis-cache-subnet"
  subnet_ids = var.vpc_subnet_ids
}