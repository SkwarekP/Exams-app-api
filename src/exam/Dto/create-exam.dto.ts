import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { Questions } from "../exam-types";
import { Exam } from "../entity/exam.entity";

export class CreateExamDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    //temporary userId
    //it will be got from current session
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsNumber()
    answersAmount: number;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsNumber()
    level: number;

    @IsString()
    @IsOptional()
    time?: string;

    @IsNotEmpty()
    @IsNumber()
    questionsAmount: number;

    @IsArray()
    @IsNotEmpty()
    questions: Questions[];

  }

  export type ExamCreationAttributes = Omit<
  Exam,
  'createdAt' | 'questions' | 'answers' | 'executions'
>;
  