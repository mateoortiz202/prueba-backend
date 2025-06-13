resource "aws_db_subnet_group" "productos_db_subnet_group" {
    name       = "productos-db-subnet-group"
    subnet_ids = [
        "subnet-051d0e654ced9ec2d",
        "subnet-0d597f8de83eb4deb",
        "subnet-0b3c889a793c6e4b0"
    ]

    tags = {
        Name = "productos-db-subnet-group"
    }
}