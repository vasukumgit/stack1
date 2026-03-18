output "alb_dns_name" {
  value = aws_lb.app_alb.dns_name
}

output "blue_instance_public_ip" {
  value = aws_instance.blue.public_ip
}

output "green_instance_public_ip" {
  value = aws_instance.green.public_ip
}

output "blue_tg_arn" {
  value = aws_lb_target_group.blue_tg.arn
}

output "green_tg_arn" {
  value = aws_lb_target_group.green_tg.arn
}

output "listener_arn" {
  value = aws_lb_listener.http.arn
}
