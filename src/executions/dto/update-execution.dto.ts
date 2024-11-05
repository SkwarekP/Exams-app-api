import { PartialType } from '@nestjs/mapped-types';
import { CreateExecutionDto } from './create-execution.dto';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { ExecutionAnswers } from '../executions.types';

export class UpdateExecutionDto extends PartialType(CreateExecutionDto) {
    @IsNotEmpty()
    @IsNumber()
    currentQuestionId: number;
    
    @IsNotEmpty()
    @IsString()
    currentQuestion: string;

    @IsNotEmpty()
    @IsObject()
    answers: ExecutionAnswers;

    @IsNumber()
    @IsNotEmpty()
    answeredQuestionsAmount: number;

    @IsBoolean()
    @IsOptional()
    passed?: boolean;

}
