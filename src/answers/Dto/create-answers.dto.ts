import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Answers } from "../entity/answers.entity";

export class CreateAnswersDto {
    @IsNotEmpty()
    @IsUUID()
    answerId: string;

    @IsNotEmpty()
    @IsString()
    correctAnswer: string;

    @IsNotEmpty()
    @IsUUID()
    examId: string;
  }

  export type AnswersCreationAttributes = Omit<
  Answers,
  'exam'
>;