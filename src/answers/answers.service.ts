// import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Answers } from './entity/answers.entity';
// import { Repository } from 'typeorm';
// import { CorrectAnswers } from './answers.types';
// import { ExecutionsService } from 'src/executions/executions.service';
// import { ExamService } from 'src/exam/exam.service';
// import { AnswersCreationAttributes, CreateAnswersDto } from './Dto/create-answers.dto';

// @Injectable()
// export class AnswersService {
//   addAnswer(examId: string) {
//     throw new Error('Method not implemented.');
//   }
//   constructor(
//     @InjectRepository(Answers)
//     private answersRepository: Repository<Answers>,
//     @Inject(forwardRef(() => ExecutionsService)) 
//     private executionService: ExecutionsService,
//     @Inject(forwardRef(() => ExamService))
//     private examService: ExamService
//   ) {}

//   async getAllAnswers(): Promise<Answers[]> {
//     return this.answersRepository.find();
//   }

//   async getAnswersByExecutionId(
//     executionId: string,
//   ): Promise<CorrectAnswers[]> {

//     try {
//       const execution = await this.executionService.findExecution(executionId)

//       if(!execution) {
//         throw new NotFoundException("Execution not found")
//       }

//       const answers = await this.answersRepository.find({
//         where: {examId: execution.examId}
//       })

//       const mappedAnswers = answers.map((answer) => {
//         return {answerId: answer.answerId, correctAnswer: answer.correctAnswer}
//       })

//       return mappedAnswers;
//     } catch (error) {
//       throw new InternalServerErrorException("There is an error in Answers Service: ", error.message)
//     }
//   }

//   async getAnswersByExamId(
//     examId: string,
//   ): Promise<CorrectAnswers[]> {
//     try {
//       const exam = await this.examService.getExam(examId)

//       if(!exam) {
//         throw new NotFoundException("Exam not found while getting answers by exam id")
//       }

//       const answers = await this.answersRepository.find({
//         where: {examId: exam.examId}
//       })

//       const mappedAnswers = answers.map((answer) => {
//         return {answerId: answer.answerId, correctAnswer: answer.correctAnswer}
//       })

//       return mappedAnswers;
//     } catch (error) {
//       throw new InternalServerErrorException("There is an error in Answers Service: ", error.message)
//     }
//   }

//   async getCorrectAnswer(questionId: string): Promise<string> {
//     const correctAnswer = await this.answersRepository.findOne({
//       where: { answerId: questionId },
//     });
//     if (!correctAnswer) {
//       throw new NotFoundException(
//         'There is no correct answer in database',
//       );
//     }

//     return correctAnswer.correctAnswer;
//   }

//   async addAnswerToDatabase(createAnswersDto: CreateAnswersDto[]): Promise<Answers[]> {
//     try {
//       const createAnswers = this.answersRepository.create(createAnswersDto);

//       return await this.answersRepository.save(createAnswers);

//     } catch (error) {
//         throw new BadRequestException(`Failed to insert answers: ${error.message}`)
//     }
//   }

// }
