import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { Reflector } from "@nestjs/core";
import { WinstonModule } from "nest-winston";
import { AppModule } from "./app.module";
import { TransformInterceptor } from "./shared/infrastructures/interceptors/transform.interceptor";
import { AllExceptionsFilter } from "./shared/infrastructures/filters/http-exception.filter";
import { winstonLoggerOptions } from "./shared/infrastructures/logging/winston.config";

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonLoggerOptions);

  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger,
  });

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  app.useGlobalFilters(new AllExceptionsFilter());

  app.setGlobalPrefix("api/v1");

  const port = Number(process.env.PORT ?? 4000);
  await app.listen(port);

  logger.log(`Conference API listening on http://localhost:${port}/api/v1`);
}

void bootstrap();
