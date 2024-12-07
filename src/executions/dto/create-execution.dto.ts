import { Execution } from '../entities/execution.entity';
import {
  IsInt,
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsArray,
  IsUUID,
} from 'class-validator';
import { ExecutionAnswers, ExecutionStatus } from '../executions.types';

export type ExecutionCreationAttributes = Omit<
  Execution,
  'executionId' | 'user' | 'exam'
>;

export class CreateExecutionDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  examId: string;

  @IsString()
  currentQuestion: string;

  @IsUUID()
  @IsNotEmpty()
  currentQuestionId: string;

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
