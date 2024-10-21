
export class CreateExecutionDto {
    executionId: string;
    userId: string;
    examId: string;
    currentQuestion: string;
    startTime: string;
    timeEnd: string;
    duration: number;
    score: number;
    maxScore: number;
    passed: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
}
