import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.setGlobalPrefix('methods');
  app.enableCors();

  const configSwagger = new DocumentBuilder()
    .setTitle('myIIT.Service')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('/swagger', app, documentSwagger);

  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

bootstrap();