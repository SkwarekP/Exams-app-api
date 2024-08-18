export class ExamDto {
    name: string;
    createdAt?: string;
    category?: string;
    time?: string;
    level: number;
    questionsAmount: number;
    answersAmount: number;
    status: string;
}