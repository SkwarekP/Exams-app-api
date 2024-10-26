import { Module } from '@nestjs/common';
import { ExecutionsService } from './executions.service';
import { ExecutionsController } from './executions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Execution } from './entities/execution.entity';
import { UsersModule } from 'src/users/users.module';
import { ExamModule } from 'src/exam/exam.module';

@Module({
  imports: [TypeOrmModule.forFeature([Execution]), UsersModule, ExamModule],
  controllers: [ExecutionsController],
  providers: [ExecutionsService],
  exports: [ExecutionsService],
})
export class ExecutionsModule {}
