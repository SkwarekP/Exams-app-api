import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExecutionsService } from './executions.service';
import { CreateExecutionDto } from './dto/create-execution.dto';
import { UpdateExecutionDto } from './dto/update-execution.dto';

@Controller('executions')
export class ExecutionsController {
  constructor(private readonly executionsService: ExecutionsService) {}

  @Post()
  async create(@Body() createExecutionDto: CreateExecutionDto) {
    return await this.executionsService.createExecution(createExecutionDto);
  }

  @Get(':userId')
  getAllExecutions(@Param('userId') userId: number) {
    return this.executionsService.getAllExecutions(userId);
  }

  @Get('execution/:executionId')
  getExecution(@Param('executionId') executionId: string) {
    return this.executionsService.findExecution(executionId);
  }

  @Patch('execution/:executionId')
  async update(
    @Param('executionId') executionId: string,
    @Body() updateExecutionDto: UpdateExecutionDto,
  ) {
    return await this.executionsService.updateExecution(executionId, updateExecutionDto);
  }

  @Delete('execution/:executionId')
  remove(@Param('id') executionId: string) {
    return this.executionsService.remove(+executionId);
  }
}
