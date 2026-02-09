import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import dotenv from 'dotenv';
import { Response } from 'express';

dotenv.config();

import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: [
      'https://main.d220l2ccf6vick.amplifyapp.com',
      'http://localhost:5173',
      // Permitir acesso para html2pdf e outras ferramentas de renderização
      '*',
    ],
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

  // Servir arquivos estáticos da pasta uploads com headers CORS adequados
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
    setHeaders: (res: Response, path: string) => {
      // Adicionar headers CORS para permitir acesso às imagens pelo html2pdf
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
      );

      // Cache headers para melhor performance
      if (path.match(/\.(jpg|jpeg|png|gif)$/i)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 ano
      }
    },
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
