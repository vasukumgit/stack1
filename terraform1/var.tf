variable "aws_region"{
    default = "us-east-2"
}
variable "ami_id"{
    description = "Ubuntu AMI ID"
    type        = string
}
variable "instance_type " {
    default = "t3.micro"
}
variable "key_name" {
  description = "jsm.pem"
  type        = string
}