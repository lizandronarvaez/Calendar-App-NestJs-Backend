import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('AppListen');
  const PORT = process.env.PORT;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  //! TODO:Crear configuracion de cors
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const corsOptions = {};
  app.enableCors();
  app.setGlobalPrefix('v1/api');
  await app.listen(PORT);
  logger.log(`Servidor funcionando en el puerto ${PORT}`);
}
bootstrap();
