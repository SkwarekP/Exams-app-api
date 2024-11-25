import { Body, Controller, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './Dto/create-exam.dto';

@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get()
  getExams() {
    return this.examService.getAllExams();
  }

  @Get(':id')
  getExam(@Param('examId') examId: string) {
    return this.examService.getExam(examId);
  }

  @Get('/execution/:executionId')
  getExamByName(@Param('executionId') executionId: string) {
    return this.examService.findExamByExecutionId(executionId);
  }

  @Post()
  createExam(@Body() createExam: CreateExamDto) {
    return this.examService.createExam(createExam);
  }

  @Put(':id')
  updateExam(@Param('id') id: number) {
    return { id };
  }
}
