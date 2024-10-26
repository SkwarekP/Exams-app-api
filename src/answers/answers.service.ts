import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answers } from './entity/answers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answers)
    private answersRepository: Repository<Answers>,
  ) {}

  async getAllAnswers(): Promise<Answers[]> {
    return this.answersRepository.find();
  }

  async getAnswersByExamId(
    examId: number,
  ): Promise<{ answerId: number; correctAnswer: string }[]> {
    const answers = await this.answersRepository.find({
      where: { examId: examId },
      relations: ['exam'],
    });

    const mappedData = answers.map((item) => {
      return { answerId: item.answerId, correctAnswer: item.correctAnswer };
    });

    return mappedData;
  }

  async getCorrectAnswer(questionId: number): Promise<string> {
    const correctAnswer = await this.answersRepository.findOne({
      where: { answerId: questionId },
    });
    if (!correctAnswer) {
      throw new NotFoundException(
        'Ops... there is no correct answer in database',
      );
    }

    return correctAnswer.correctAnswer;
  }

  async addAnswer(examId: number): Promise<string> {
    return 'x';
  }
}
