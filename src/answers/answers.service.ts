import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answers } from './entity/answers.entity';
import { Repository } from 'typeorm';
import { CorrectAnswers } from './answers.types';
import { ExecutionsService } from 'src/executions/executions.service';
import { isNotEmpty } from 'class-validator';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answers)
    private answersRepository: Repository<Answers>,
    private executionService: ExecutionsService,
  ) {}

  async getAllAnswers(): Promise<Answers[]> {
    return this.answersRepository.find();
  }

  async getAnswersByExamId(
    executionId: string,
  ): Promise<CorrectAnswers[]> {

    try {
      const execution = await this.executionService.findExecution(executionId)

      if(!execution) {
        throw new NotFoundException("Execution not found")
      }

      const answers = await this.answersRepository.find({
        where: {examId: execution.examId}
      })

      const mappedAnswers = answers.map((answer) => {
        return {answerId: answer.answerId, correctAnswer: answer.correctAnswer}
      })

      return mappedAnswers;
    } catch (error) {
      throw new InternalServerErrorException("There is an error in Answers Service: ", error.message)
    }
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
