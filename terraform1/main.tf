resource "aws_vpc" "main1" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "tfm-vpc1"
  }
}

resource "aws_subnet" "public_a1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true

  tags = {
    Name = "tfm-public-a1"
  }
}

resource "aws_subnet" "public_b1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "${var.aws_region}b"
  map_public_ip_on_launch = true

  tags = {
    Name = "tfm-public-b1"
  }
}

resource "aws_internet_gateway" "tgw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "tfm-igw"
  }
}

resource "aws_route_table" "t-rt" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }

  tags = {
    Name = "tfm-rt"
  }
}

resource "aws_route_table_association" "t-rta_a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.rt.id
}

resource "aws_route_table_association" "t-rta_b" {
  subnet_id      = aws_subnet.public_b.id
  route_table_id = aws_route_table.rt.id
}
