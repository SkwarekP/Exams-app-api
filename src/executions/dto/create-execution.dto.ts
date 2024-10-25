import { Execution } from "../entities/execution.entity";
import { IsInt, IsString, IsBoolean, IsOptional, IsNotEmpty, IsIn } from 'class-validator';

export type ExecutionCreationAttributes = Omit<Execution, 'executionId' | 'user' | 'exam'>;

export class CreateExecutionDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    examId: number;

    @IsString()
    currentQuestion: string;

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
    status: string;
}
