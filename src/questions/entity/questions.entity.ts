import { Answers } from "src/answers/entity/answers.entity";
import { Exam } from "src/exam/entity/exam.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Questions {
    @PrimaryGeneratedColumn({name: 'question_id'})
    questionId: number

    @Column({name: 'exam_id'})
    examId: number;

    @Column({name: 'question_content'})
    question: string

    @Column("varchar", {array: true})
    answers: string[]

    @ManyToOne(() => Exam, exam => exam.questions)
    @JoinColumn({name: 'exam_id'})
    exam: Exam;

    @OneToOne(() => Answers)
    correctAnswer: Answers;

}