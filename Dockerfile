# Imagen base con Node y soporte TypeScript
FROM node:22-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Compilar TS
RUN npm run build

EXPOSE 3000

# Comando para arrancar la app
CMD ["node", "dist/main"]
