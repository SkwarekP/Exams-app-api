import { forwardRef, Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from './entity/questions.entity';
import { AnswersModule } from 'src/answers/answers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Questions]),
    forwardRef(() => AnswersModule)
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService]
})
export class QuestionsModule {}
