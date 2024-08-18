import { Controller, Get, Param } from '@nestjs/common';
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
}
