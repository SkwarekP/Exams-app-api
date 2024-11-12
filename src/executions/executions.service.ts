import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateExecutionDto,
  ExecutionCreationAttributes,
} from './dto/create-execution.dto';
import { UpdateExecutionDto } from './dto/update-execution.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Execution } from './entities/execution.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ExamService } from 'src/exam/exam.service';
import { AnswersService } from 'src/answers/answers.service';

@Injectable()
export class ExecutionsService {
  constructor(
    @InjectRepository(Execution)
    private executionRepository: Repository<Execution>,
    private userService: UsersService,
    @Inject(forwardRef(() => ExamService)) 
    private readonly examService: ExamService,
    private answersService: AnswersService,
  ) {}
  async createExecution(
    createExecutionDto: CreateExecutionDto,
  ): Promise<Execution> {
    try {
      const existingUser = await this.userService.getUser(
        createExecutionDto.userId,
      );
      const userHasExecutionOpen = await this.executionRepository.findOne({
        where: {
          userId: existingUser?.userId,
          examId: createExecutionDto.examId,
        },
      });

      if (userHasExecutionOpen) {
        throw new ConflictException(
          'This user already has open incompleted exam',
        );
      }

      const execution = {...createExecutionDto, answers: []}

      const createExecution = this.executionRepository.create(
        execution as ExecutionCreationAttributes,
      );
      const saveExecution = await this.executionRepository.save(createExecution);

      console.warn('Execution created successfully');
      return saveExecution;
    } catch (error) {
      console.error('Error creating execution:', error);
      throw new ConflictException(
        'This user already has open incompleted exam',
      );
    }
  }

  async getAllExecutions(userId: number): Promise<Execution[]> {
    try {
      const user = await this.userService.getUser(userId)
      if(!user) {
        throw new NotFoundException('User not found')
      }

      const executions = await this.executionRepository.find({
        where: {
          userId: user.userId
        },
        relations: ['user', 'exam']
      })

      return executions;
    } catch (error) {
      throw new BadRequestException(`there was some troubles during fetching executions, error: ${error}`)
    }
  }

  async findExecution(executionId: string): Promise<Execution> {
    const execution = await this.executionRepository.findOne({where: {executionId: executionId}})

    if(!execution) {
      throw new NotFoundException("Execution not found")
    }

    return execution;
  }

  async updateExecution(executionId: string, updateExecutionDto: UpdateExecutionDto): Promise<Execution> {
    const execution = await this.findExecution(executionId);
    const exam = await this.examService.findExamByExecutionId(executionId)
    if(!execution) {
      throw new NotFoundException('Execution not found');
    }

    if(!exam){
      throw new NotFoundException('Exam not found');
    }
    
    try {
      execution.answers = execution.answers || [];

      const existingAnswerIndex = execution.answers.findIndex(answer_ => answer_.questionId === updateExecutionDto.answers.questionId)

      if(existingAnswerIndex !== -1) {
        execution.answers[existingAnswerIndex].answer = updateExecutionDto.answers.answer;
      } else {
        execution.answers.push({
          questionId: updateExecutionDto.answers.questionId,
          answer: updateExecutionDto.answers.answer,
          questionOrder: updateExecutionDto.answers.questionOrder
      })};

      if(execution.answers.length === exam.questionsAmount) {
        const correctAnswers = await this.answersService.getAnswersByExamId(exam.examId)
        const score = execution.answers.filter((item, index) => item.answer === correctAnswers[index].correctAnswer).length
        execution.score = score;
      }

      execution.currentQuestion = updateExecutionDto.currentQuestion;
      execution.currentQuestionId = updateExecutionDto.currentQuestionId;
      execution.answeredQuestionsAmount = updateExecutionDto.answeredQuestionsAmount;
      execution.passed = updateExecutionDto.passed ?? null;
      execution.status = updateExecutionDto.status ?? 'PENDING';
      
  
      return await this.executionRepository.save(execution)

    } catch (error) {
      throw new BadRequestException("Cannot update the execution due to: ", error.message);
    }

  }

  remove(id: number) {
    return `This action removes a #${id} execution`;
  }
}
