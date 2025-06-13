import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    // Cargo variables desde .env
    // y permite el acceso a variables del mismo desde cualquier lugar
    ConfigModule.forRoot({
      isGlobal: true, //Disponible en todo el proyecto
    }),
    // Configuración conexion db
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT  || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: process.env.DB_SSL === 'true' ? {rejectUnauthorized: false}: false,
      // Detecta automáticamente entidades
      autoLoadEntities: true,

      // Solo desarrollo: crea tablas automáticamente
      synchronize: true,
    }),
    ProductsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
