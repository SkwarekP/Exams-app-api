
export interface ExecutionAnswers {
    questionId: number,
    answer: string,
    questionOrder: number
}

export type ExecutionStatus = 'PENDING' | 'COMPLETED' | 'NOT_STARTED'
