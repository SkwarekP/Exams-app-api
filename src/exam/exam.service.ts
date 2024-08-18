import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from './entity/exam.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExamService {
    constructor(
        @InjectRepository(Exam)
        private examRepository: Repository<Exam>
    ) { }

    async getAllExams(): Promise<Exam[]> {
        return this.examRepository.find()
    }

    async getExam(examId: number): Promise<Exam> {
        const exam = await this.examRepository.findOne({where: {examId}, relations: ['questions']})
        if(!exam) {
            throw new NotFoundException('The exam with provided id not found');
        }
        return exam;
    }

    async findExamByName(examName: string): Promise<Exam> {
        const exam = await this.examRepository.findOne({where: {name: examName}, relations: ['questions']})
        if(!exam) {
            throw new NotFoundException('The exam with provided name not found');
        }
        return exam;
    }

}
