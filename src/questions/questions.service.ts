import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions } from './entity/questions.entity';
import { Repository } from 'typeorm';
import { CreateQuestions } from './Dto/create-questions.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Questions)
    private questionsRepository: Repository<Questions>,
  ) {}

  async getAllQuestions(): Promise<Questions[]> {
    return this.questionsRepository.find();
  }

  async getQuestionsForProvidedExam(examId: string): Promise<Questions[]> {
    const questions = await this.questionsRepository.find({ where: { examId: examId } });
    if (!questions || questions.length === 0)
      throw new NotFoundException(
        'There are no questions attached to this exam',
      );
    return questions;
  }

  async addQuestionsToDatabase(questions: CreateQuestions[]): Promise<void> {
    const questionsMapped = questions.map((question) => ({
      ...question,
      answers: question.answers.map((answer) => answer.answer)
    }))

    try {
      const createQuestions = this.questionsRepository.create(
        questionsMapped
      )
      await this.questionsRepository.save(createQuestions)

      console.warn('Questions have been added successfully');
    } catch (error) {
        throw new BadRequestException(`Can't save questions to database due to: ${error.message}`)
    }
  }
}
