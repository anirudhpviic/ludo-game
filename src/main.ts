import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { parseCommandLineArgs } from './core/env/util';
globalThis.CL_ARGS = parseCommandLineArgs();
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './core/filters/exception.filter';
import { ResponseInterceptor } from './core/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<EnvironmentVariables, true>);
  const httpAdaptor = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(httpAdaptor))
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.enableCors({ origin: '*' })
  await app.listen(configService.get('PORT'), () => {
    console.log(`server is running on port ${configService.get('PORT')}`);
  });
}
bootstrap();
