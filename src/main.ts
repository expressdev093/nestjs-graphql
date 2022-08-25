import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './modules/auth/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  //app.useGlobalGuards([RolesGuard]);
  const config = app.get(ConfigService);
  const PORT = config.get<number>('PORT');
  await app.listen(PORT, () => {
    console.log(`Server is runnin on port ${PORT}`);
  });
}
bootstrap();
