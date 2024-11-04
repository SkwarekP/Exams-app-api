import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './entity/exam.entity';
import { ExecutionsModule } from 'src/executions/executions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Exam]), ExecutionsModule],
  controllers: [ExamController],
  providers: [ExamService],
  exports: [ExamService],
})
export class ExamModule {}
