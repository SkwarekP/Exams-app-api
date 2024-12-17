import { QuestionsDuringExam } from "../exam-types";

export class AssignedUserExams {
  examId: string;
  name: string;
  answersAmount: number;
  category: string;
  level: number;
  time?: string;
  questionsAmount: number;
  questions: QuestionsDuringExam[];
  status: string;
  createdAt?: string;
}
