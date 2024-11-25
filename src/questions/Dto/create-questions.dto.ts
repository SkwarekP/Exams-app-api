import { IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Answers } from "src/exam/exam-types";

export class CreateQuestions {
  
    @IsUUID()
    @IsNotEmpty()
    questionId: string;

    @IsNotEmpty()
    @IsUUID()
    examId: string;
  
    @IsArray()
    @IsNotEmpty()
    answers: Answers[];
    
    @IsString()
    @IsNotEmpty()
    question: string;
  }
  