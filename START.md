Inicializando do 0:

    nest new nome-do-projeto

Inicializando um projeto em um repositório existente:

    nest new . --skip-git

Instalado o ORM Prisma:

    npm install -D prisma
    npm install @prisma/client

Inicializando o ORM Prisma:

    npx prisma init

Inicializando o ORM Prisma com mongodb:

    npx prisma init --datasource-provider mongodb

Instalando o Swagger:

    npm install @nestjs/swagger swagger-ui-express

Configurando o Swagger no main.ts:

``` typescript
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Polaroid API')
    .setDescription('API para o projeto Polaroid')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```

Acessar documentação Swagger:

    http://localhost:3000/api

Subindo o schema para o mongodb Atlas:

    npx prisma db push

Fluxo de Adição de Novos Serviços no NestJS
A ordem recomendada é:

1. DTO (Data Transfer Object) - Se necessário
Defina os dados de entrada/saída

2. Repository
Adicione os métodos de acesso aos dados

3. Service
Implemente a lógica de negócio

4. Controller
Exponha os endpoints HTTP