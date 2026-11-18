# -----------------------------------------------------------------
# OUTPUTS
# -----------------------------------------------------------------

output "elasticache_cluster_url" {
  value = "redis://${aws_elasticache_cluster.elasticache_cluster.cache_nodes[0].address}:${aws_elasticache_cluster.elasticache_cluster.cache_nodes[0].port}"
}