import { Execution } from '../entities/execution.entity';
import {
  IsInt,
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsArray,
  IsNumber,
  IsUUID,
} from 'class-validator';
import { ExecutionAnswers, ExecutionStatus } from '../executions.types';

export type ExecutionCreationAttributes = Omit<
  Execution,
  'executionId' | 'user' | 'exam'
>;

export class CreateExecutionDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  @IsUUID()
  examId: string;

  @IsString()
  currentQuestion: string;

  @IsNumber()
  @IsNotEmpty()
  currentQuestionId: number;

  @IsOptional()
  @IsArray()
  answers: ExecutionAnswers

  @IsString()
  @IsOptional()
  executionEndTime?: string;

  @IsString()
  @IsOptional()
  duration?: string;

  @IsOptional()
  @IsInt()
  score: number;

  @IsInt()
  maxScore: number;

  @IsOptional()
  @IsBoolean()
  passed: boolean;

  @IsString()
  status: ExecutionStatus;
}
