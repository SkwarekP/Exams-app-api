import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from './entity/exam.entity';
import { Repository } from 'typeorm';
import { ExecutionsService } from 'src/executions/executions.service';
import { CreateExamDto } from './Dto/create-exam.dto';
import { UsersService } from 'src/users/users.service';
import { QuestionsService } from 'src/questions/questions.service';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
    private executionService: ExecutionsService,
    private userService: UsersService,
    private questionsService: QuestionsService
  ) { }

  async getAllExams(): Promise<Exam[]> {
    return this.examRepository.find({ relations: ['questions', 'executions'] });
  }

  async createExam(createExamDto: CreateExamDto): Promise<void> {
    const user = await this.userService.getUser(createExamDto.userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    try {
      const createExam = this.examRepository.create({
        name: createExamDto.name,
        time: createExamDto?.time ?? "No time limit",
        level: createExamDto.level,
        questionsAmount: createExamDto.questionsAmount,
        answersAmount: createExamDto.answersAmount,
        category: createExamDto.category,
        status: "Active",
      })

      const saveExam = await this.examRepository.save(createExam)

      const questionsWithExamIdConcatenated = createExamDto.questions.map((question) => ({
        ...question,
        examId: saveExam.examId
      }));

      await this.questionsService.addQuestionsToDatabase(questionsWithExamIdConcatenated)

      console.warn('Exam have been created successfully');
    } catch (error) {
      throw new InternalServerErrorException(`Cannot create an exam due to ${error.message}.`)
    }
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

