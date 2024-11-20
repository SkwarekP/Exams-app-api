import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions } from './entity/questions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Questions)
    private questions: Repository<Questions>,
  ) {}

  async getAllQuestions(): Promise<Questions[]> {
    return this.questions.find();
  }

  async getQuestionsForProvidedExam(examId: string): Promise<Questions[]> {
    const questions = await this.questions.find({ where: { examId: examId } });
    if (!questions || questions.length === 0)
      throw new NotFoundException(
        'There are no questions attached to this exam',
      );
    return questions;
  }
}
