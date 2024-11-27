import { QuestionsDuringExam } from "../exam-types";

export class ExamDto {
  examId: string;
  name: string;
  //temporary userId
  //it will be got from current session
  answersAmount: number;
  category: string;
  level: number;
  time?: string;
  questionsAmount: number;
  questions: QuestionsDuringExam[];
  status: string;
  createdAt?: string;
}
