import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from './entity/exam.entity';
import { Repository } from 'typeorm';
import { ExecutionsService } from 'src/executions/executions.service';
import { CreateExamDto } from './Dto/create-exam.dto';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
    private executionService: ExecutionsService
  ) { }

  async getAllExams(): Promise<Exam[]> {
    return this.examRepository.find({ relations: ['questions', 'executions'] });
  }

  async createExam(createExamDto: CreateExamDto): Promise<Exam> {
    // const user = await this.user
    return {} as Exam;
  }

  async getExam(examId: string): Promise<Exam> {
    const exam = await this.examRepository.findOne({
      where: { examId },
      relations: ['questions'],
    });
    if (!exam) {
      throw new NotFoundException('The exam with provided id not found');
    }
    return exam;
  }

  async findExamByExecutionId(executionId: string): Promise<Exam> {

    try {
      const execution = await this.executionService.findExecution(executionId)
      const exam = await this.examRepository.findOne({
        where: { examId: execution.examId },
        relations: ['questions'],
      });

      if (!exam) {
        throw new NotFoundException('Exam not found');
      }

      return exam;
    } catch (error) {
      throw new BadRequestException("Exam cannot be found due to: ", error.message)
    }
  }
}

