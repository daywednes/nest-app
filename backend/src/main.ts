import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as config from 'config';
import { AppModule } from './app.module';


var autobahn = require('autobahn');
var connection = new autobahn.Connection({url: 'ws://localhost:8080/ws', realm: 'realm1'});

connection.onopen = function (session) {

   // 1) subscribe to a topic
   function onevent(args) {
      console.log("Event:", args[0]);
   }
   session.subscribe('com.myapp.hello', onevent);

   // 2) publish an event
   session.publish('com.myapp.hello', ['Hello, world!']);

   // 3) register a procedure for remoting
   function add2(args) {
      return args[0] + args[1];
   }
   session.register('com.myapp.hello', add2);

   // 4) call a remote procedure
   session.call('com.myapp.hello', [2, 3]).then(
      function (res) {
         console.log("Result:", res);
      }
   );
};

connection.open();

async function bootstrap() {
  const logger = new Logger('bootstratp');
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');

  logger.log(`current env: ${process.env.NODE_ENV}`);

  if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
    app.enableCors({ origin: serverConfig.origin });
    logger.log(`Accepting requests from ${serverConfig.origin}`);
  } else {
    logger.log(`CORS enabled for development`);
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

  await app.listen(process.env.PORT || serverConfig.port);
  logger.log(`Application started listening to port ${serverConfig.port}`);
}
bootstrap();
