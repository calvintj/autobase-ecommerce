// main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend (Next.js app on localhost:3000)
  app.enableCors({
    origin: ['http://localhost:3000'], // or use '*' if needed
    credentials: true,
  });

  // Enable cookie parsing for JWT httpOnly cookies
  app.use(cookieParser());

  // Global validation pipe (applies class-validator to all DTOs)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips unknown properties
      forbidNonWhitelisted: true, // throws error on unknown props
      transform: true, // transforms payloads to DTO class instances
    }),
  );

  const PORT = process.env.PORT || 4000;
  await app.listen(PORT);
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
}
bootstrap();
