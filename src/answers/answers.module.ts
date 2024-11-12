import { forwardRef, Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answers } from './entity/answers.entity';
import { ExecutionsModule } from 'src/executions/executions.module';
import { ExamModule } from 'src/exam/exam.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answers]), 
    forwardRef(() => ExecutionsModule),
    forwardRef(() => ExamModule)
  ],
  controllers: [AnswersController],
  providers: [AnswersService],
  exports: [AnswersService]
})
export class AnswersModule {}
