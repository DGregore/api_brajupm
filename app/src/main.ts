
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar validações globais
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Configurar CORS se necessário
  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`Aplicação rodando na porta ${port}`);
  console.log(`Swagger: http://localhost:${port}/api`);
  console.log(`Endpoints disponíveis:`);
  console.log(`  GET /contratos/cpf/{cpf}`);
  console.log(`  GET /contratos/celular/{celular}`);
}
bootstrap();
