import { Questions } from "src/questions/entity/questions.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Answers {
    @PrimaryGeneratedColumn({name: 'answer_id'})
    answerId: number;

    @Column({name: 'correct_answer'})
    correctAnswer: string

    // @OneToOne(() => Questions)
    // @JoinColumn({name: 'answer_id'})
    // questions: Questions[]
}