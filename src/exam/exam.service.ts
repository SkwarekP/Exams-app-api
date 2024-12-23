import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from './entity/exam.entity';
import { Repository } from 'typeorm';
import { ExecutionsService } from 'src/executions/executions.service';
import { CreateExamDto } from './Dto/create-exam.dto';
import { UsersService } from 'src/users/users.service';
import { QuestionsService } from 'src/questions/questions.service';
import { ExamDto } from './Dto/exam.dto';
import { QuestionsDuringExam } from './exam-types';
import { AssignedUserExams } from './Dto/assigned-user-exams.dto';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
    private executionService: ExecutionsService,
    private userService: UsersService,
    private questionsService: QuestionsService
  ) { }

  async getAllExams(): Promise<ExamDto[]> {

    try {
      const exams = await this.examRepository.find({ relations: ['questions', 'executions', 'users'] })
      
      const transformedExams: ExamDto[] = exams.map((exam) => ({
        examId: exam.examId,
        name: exam.name,
        answersAmount: exam.answersAmount,
        category: exam.category,
        level: exam.level,
        time: exam.time,
        questionsAmount: exam.questionsAmount,
        status: exam.status,
        createdAt: exam.createdAt,
        users: exam.users,
        questions: exam.questions.map(({ questionId, question, answers }) => ({
          questionId,
          question,
          answers,
        })) as QuestionsDuringExam[], 
      }));

      return transformedExams;
    } catch (error) {
      throw new InternalServerErrorException(`there was an error: ${error.message}`);
    }

  }

  async getExamsAssignedToUser(userId: string): Promise<AssignedUserExams[]> {
    try {
      const exams = await this.examRepository.find({ relations: ['questions', 'users']})

      const filteredExams = exams.filter((exam) => exam.users.some((user) => user.userId === userId));
      
      if(filteredExams.length === 0) {
        throw new NotFoundException("This user hasn't assigned any exam yet.")
      }

      const transformedExams: AssignedUserExams[] = filteredExams.map((exam) => ({
        examId: exam.examId,
        name: exam.name,
        answersAmount: exam.answersAmount,
        category: exam.category,
        level: exam.level,
        time: exam.time,
        questionsAmount: exam.questionsAmount,
        status: exam.status,
        createdAt: exam.createdAt,
        questions: exam.questions.map(({ questionId, question, answers }) => ({
          questionId,
          question,
          answers,
        })) as QuestionsDuringExam[], 
      }));

      return transformedExams;

    } catch (error) {
      throw new InternalServerErrorException(`There was an error during ${error.message}`)
    }
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

  async findExamByExecutionId(executionId: string, includeSummary?: boolean): Promise<ExamDto | Exam> {
    try {
      const execution = await this.executionService.findExecution(executionId)
      const exam = await this.examRepository.findOne({
        where: { examId: execution.examId },
        relations: ['questions'],
      });

      if (!exam) {
        throw new NotFoundException('Exam not found');
      }

      const examDto: ExamDto = {
        examId: exam.examId,
        name: exam.name,
        answersAmount: exam.answersAmount,
        category: exam.category,
        level: exam.level,
        time: exam.time,
        questionsAmount: exam.questionsAmount,
        status: exam.status,
        questions: exam.questions.map((question) => ({
          questionId: question.questionId,
          question: question.question,
          answers: question.answers, // Include only answers, exclude correctAnswer
        })),
      }

      return includeSummary ? exam : examDto;
    } catch (error) {
      throw new BadRequestException("Exam cannot be found due to: ", error.message)
    }
  }
}

