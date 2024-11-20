import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Questions } from "../exam-types";

export class CreateExamDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    //temporary userId
    //it will be got from current session
    @IsNotEmpty()
    @IsNumber()
    userId: number;

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
  