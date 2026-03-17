output "ec2_public_ip" {
  value = aws_instance.tf_infras.public_ip
}