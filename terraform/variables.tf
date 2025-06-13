
variable "identifier" {
  description = "Identificador de la instancia RDS"
  type        = string
  default     = "productos-db-with-file"
}

variable "instance_class" {
  description = "Clase de instancia de RDS"
  type        = string
  default     = "db.t3.micro"
}

variable "engine" {
  description = "Motor de base de datos"
  type        = string
  default     = "postgres"
}

variable "engine_version" {
  description = "Versión del motor"
  type        = string
  default     = "17.4"
}

variable "db_username" {
  description = "Usuario maestro de la base de datos"
  type        = string
  default     = "postgres"
}

variable "db_password" {
  description = "Contraseña del usuario maestro"
  type        = string
  default     = "Qwert1234"
  sensitive   = true
}

variable "db_name" {
  description = "Nombre de la base de datos"
  type        = string
  default     = "productos"
}

variable "db_subnet_group_name" {
  description = "Nombre del grupo de subred para RDS"
  type        = string
  default     = "default-vpc-0835c85f3206ba647"
}

variable "vpc_security_group_id" {
  description = "ID de grupo de seguridad"
  type        = string
  default     = "sg-08d31eed4f07366af"
}

variable "allocated_storage" {
  description = "Almacenamiento asignado en GB"
  type        = number
  default     = 20
}

variable "skip_final_snapshot" {
  description = "Omitir la creación de un snapshot final"
  type        = bool
  default     = true
}

variable "storage_type" {
  description = "Tipo de almacenamiento (gp2, gp3, io1, etc.)"
  type        = string
  default     = "gp2"
}