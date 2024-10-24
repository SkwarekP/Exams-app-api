import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExecutionsService } from './executions.service';
import { CreateExecutionDto } from './dto/create-execution.dto';
import { UpdateExecutionDto } from './dto/update-execution.dto';

@Controller('executions')
export class ExecutionsController {
  constructor(private readonly executionsService: ExecutionsService) {}

  @Post()
  create(@Body() createExecutionDto: CreateExecutionDto) {
    return this.executionsService.create(createExecutionDto);
  }

  @Get()
  getAllExecutions() {
    return this.executionsService.findAll();
  }

  @Get('execution/:executionId')
  getExecution(@Param('id') executionId: string) {
    return this.executionsService.findOne(+executionId);
  }

  @Patch('execution/:executionId')
  update(@Param('id') executionId: string, @Body() updateExecutionDto: UpdateExecutionDto) {
    return this.executionsService.update(+executionId, updateExecutionDto);
  }

  @Delete('execution/:executionId')
  remove(@Param('id') executionId: string) {
    return this.executionsService.remove(+executionId);
  }
}
