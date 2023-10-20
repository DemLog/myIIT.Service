import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { RedocModule, RedocOptions } from 'nestjs-redoc';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.setGlobalPrefix('methods');

  const configSwagger = new DocumentBuilder()
    .setTitle('myIIT.Service')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('/swagger', app, documentSwagger);

  const redocOptions: RedocOptions = {
    title: 'myIIT.Sevice',
    logo: {
      url: 'https://psv4.userapi.com/c909628/u531590132/docs/d12/96a8e643b7be/logo.png',
      backgroundColor: '#F0F0F0',
      altText: 'PetStore logo'
    },
    sortPropsAlphabetically: true,
    hideDownloadButton: true,
    hideHostname: false,
    hideLoading: true,
    pathInMiddlePanel: true
  };
  await RedocModule.setup('/docs', app, documentSwagger, redocOptions);

  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

bootstrap();