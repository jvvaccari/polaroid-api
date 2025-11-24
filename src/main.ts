import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import dotenv from 'dotenv';

dotenv.config();

import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      const allowed = [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://ec2-98-93-227-63.compute-1.amazonaws.com:8080' // front URL exata (sem /)
        // adicione aqui outros hosts confiáveis, ex: 'http://ec2-54-90-118-168.compute-1.amazonaws.com:3001'
      ];
      // Permite requests sem origin (curl, servidores) e origin na lista
      if (!origin || allowed.includes(origin)) return callback(null, true);
      return callback(new Error('CORS Rejected'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Servir arquivos estáticos da pasta uploads
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('Documentação da API')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // Mantém a documentação sob o mesmo prefixo: /docs
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
