import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { PrismaService } from './prisma/prisma.service';
import { CreateAccountController } from './controllers/create-account.controller';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthenticateController } from './controllers/authenticate.controller';
import { AuthModule } from './auth/auth.module';
import { CreateQuestionController } from './controllers/create-questions.controller';
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true
    }),
    AuthModule,
  ],
  controllers: [CreateAccountController,AuthenticateController,CreateQuestionController,FetchRecentQuestionsController],
  providers: [PrismaService],
})
export class AppModule {}
