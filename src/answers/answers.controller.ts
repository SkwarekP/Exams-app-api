import { Controller, Get, Param, Put } from '@nestjs/common';
import { AnswersService } from './answers.service';

@Controller('answers')
export class AnswersController {
    constructor(private answersService: AnswersService) {}

    @Get()
    getAnswers() {
        return this.answersService.getAllAnswers();
    }

    @Get(":id")
    getAnswer(@Param('id') id: number) {
        return this.answersService.getCorrectAnswer(id);
    }

    @Get("/exam/:examId")
    getAllCorrectAnswersFromExam(@Param('examId') examId: number) {
        return this.answersService.getAnswersByExamId(examId)
    }

    @Put('/update/:examId')
    updateAnswers(@Param('examId') examId: number) {
        return this.answersService.addAnswer(examId);
    }
}
