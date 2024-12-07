import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamModule } from './exam/exam.module';
import { QuestionsModule } from './questions/questions.module';
import { ExecutionsModule } from './executions/executions.module';
import { UsersModule } from './users/users.module';
import { AppLoggerModule } from './AppLoggerModule';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'patryk',
      password: 'admin',
      database: 'exams',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    ExamModule,
    QuestionsModule,
    ExecutionsModule,
    UsersModule,
    AppLoggerModule,
    AuthModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 10
        }
      ]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
