import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ExamDto } from './Dto/exam.dto';
import { ExamService } from './exam.service';

@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get()
  getExams() {
    return this.examService.getAllExams();
  }

  @Get(':id')
  getExam(@Param('id') id: number) {
    return this.examService.getExam(id);
  }

  @Get('/name/:name')
  getExamByName(@Param('name') name: string) {
    return this.examService.findExamByName(name);
  }

  @Post()
  createExam(@Body() createExam: ExamDto) {
    return {};
  }

  @Put(':id')
  updateExam(@Param('id') id: number) {
    return { id };
  }
}
