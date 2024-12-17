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

  @Get('/user/:userId')
  getUserExams(@Param('userId') userId: string) {
    return this.examService.getExamsAssignedToUser(userId)
  }

  @Get(':id')
  getExam(@Param('examId') examId: string) {
    return this.examService.getExam(examId);
  }

  @Get('/execution/:executionId')
  getExamByExecutionId(
    @Param('executionId') executionId: string,
    @Query('summary') summary?: string
  ) {
    const includeSummary = summary === "true";
    return this.examService.findExamByExecutionId(executionId, includeSummary);
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
