import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answers } from './entity/answers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(Answers)
        private answersRepository: Repository<Answers>
    ) { }

    async getAllAnswers(): Promise<Answers[]> {
        return this.answersRepository.find();
    }

    async getCorrectAnswer(questionId: number): Promise<string> {
        const correctAnswer = await this.answersRepository.findOne({ where: { answerId: questionId }})
        if (!correctAnswer) {
            throw new NotFoundException("Ops... there is no correct answer in database")
        }

        return correctAnswer.correctAnswer;
    }
}
