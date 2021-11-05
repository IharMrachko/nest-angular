import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipe";
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   const config = new DocumentBuilder()
    .setTitle('Nest')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('URI UI')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({ limit: '50mb',
    parameterLimit: 100000,
    extended: true }));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors( );
  await app.listen(3000);

}
bootstrap();
