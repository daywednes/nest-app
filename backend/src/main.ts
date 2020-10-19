import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as config from 'config';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstratp');
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    logger.log(`CORS enabled`);
    app.enableCors();
  }

  const options = new DocumentBuilder()
    .setTitle('NEST API')
    .setDescription('The NEST API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const serverConfig = config.get('server');
  await app.listen(process.env.PORT || serverConfig.port);
  logger.log(`Application started listening to port ${serverConfig.port}`);
}
bootstrap();
