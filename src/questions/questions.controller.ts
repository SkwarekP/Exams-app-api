import { Controller, Get, Param } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionService: QuestionsService) { }

    @Get()
    getQuestions() {
        return this.questionService.getAllQuestions();
    }

    @Get(":id")
    getQuestionsForExam(@Param('id') id: number) {
        return this.questionService.getQuestionsForProvidedExam(id)
    }
}
