import { Module } from '@nestjs/common';
import { validateConfig } from './env/env.validator';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./envs/.env.${CL_ARGS.env}`,
      ignoreEnvVars: true,
      validate: validateConfig,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URL'),
      }),
    }),
  ],
  providers: [],
  exports: [],
})
export class CoreModule { }
