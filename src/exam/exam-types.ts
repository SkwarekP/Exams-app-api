export interface ExecutionIds {
    executionIds: string[]
}

export interface Answers {
    answerId: number;
    answer: string,
    isCorrect?: boolean;
}

export interface Questions {
    questionId: string;
    question: string;
    answers: Answers[];
  }