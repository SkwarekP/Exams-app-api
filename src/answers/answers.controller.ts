// import { Controller, Get, Param, Put } from '@nestjs/common';
// import { AnswersService } from './answers.service';

// @Controller('answers')
// export class AnswersController {
//   constructor(private answersService: AnswersService) {}

//   @Get()
//   getAnswers() {
//     return this.answersService.getAllAnswers();
//   }

//   @Get(':id')
//   getAnswer(@Param('id') id: string) {
//     return this.answersService.getCorrectAnswer(id);
//   }

//   @Get('/execution/:executionId')
//   getAllCorrectAnswersFromExam(@Param('executionId') executionId: string) {
//     return this.answersService.getAnswersByExecutionId(executionId);
//   }

//   @Put('/update/:examId')
//   updateAnswers(@Param('examId') examId: string) {
//     return this.answersService.addAnswer(examId);
//   }
// }
