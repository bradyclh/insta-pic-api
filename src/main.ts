/* eslint-disable import/first */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  INestApplication,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
// import * as bodyParse from 'body-parser';
import { AppModule } from './app.module';
import envConfig from './config/env-config';

const setupSwagger = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('insta-pic-api')
    .setDescription('Great platform for insta-pic backend')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);

  // ref: https://docs.nestjs.com/openapi/introduction#setup-options
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      // to persist auth after refresh page
      persistAuthorization: true,
    },
    // change page title
    customSiteTitle: 'insta-pic-api',
  };
  SwaggerModule.setup('api', app, document, customOptions);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: true,
    credentials: envConfig.http.allowCredentials === 'true',
  });

  // NOTE: Remain code here since its need some effort to find how to enlarge request limit
  //       Remember, when enlarge inbound request size, also to increase inbound request limit on EB
  // Enlarge inbound request size. Default is 100kb
  // app.use(bodyParse.json({ limit: '3mb' }));
  // app.use(bodyParse.urlencoded({ limit: '3mb', extended: false }));

  // Enable to use class-validator
  app.useGlobalPipes(new ValidationPipe());

  // Enable to use class-transformer
  app.useGlobalInterceptors(new ClassSerializerInterceptor(new Reflector()));

  // Set global path prefix
  app.setGlobalPrefix('api/v1');

  // Setup Swagger Explorer
  setupSwagger(app);

  // Expose app listen port
  await app.listen(envConfig.http.port);

  // Log bootstrap done
  const logger = new Logger('bootstrap');
  const URL = await app.getUrl();
  logger.log(`Application is running on: ${URL}`);
  logger.log(`Swagger is running on: ${URL}/api`);
}
bootstrap();
