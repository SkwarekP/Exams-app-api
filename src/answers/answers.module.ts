import { Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answers } from './entity/answers.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answers])
  ],
  controllers: [AnswersController],
  providers: [AnswersService]
})
export class AnswersModule {}
