import { forwardRef, Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './entity/exam.entity';
import { ExecutionsModule } from 'src/executions/executions.module';
import { AnswersModule } from 'src/answers/answers.module';
import { QuestionsModule } from 'src/questions/questions.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exam]),
    QuestionsModule,
    UsersModule,
    forwardRef(() => ExecutionsModule),
    forwardRef(() => AnswersModule)
  ],
  controllers: [ExamController],
  providers: [ExamService],
  exports: [ExamService],
})
export class ExamModule {}
