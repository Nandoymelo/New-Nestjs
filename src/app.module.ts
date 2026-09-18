import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { PrismaService } from './prisma/prisma.service';
import { CreateAccountController } from './controllers/created-account.controller';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthenticateController } from './controllers/authenticate-controller';
import { AuthModule } from './auth/auth.module';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true
    }),
    AuthModule,
  ],
  controllers: [CreateAccountController,AuthenticateController],
  providers: [PrismaService],
})
export class AppModule {}
