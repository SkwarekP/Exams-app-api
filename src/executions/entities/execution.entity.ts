import { Exam } from "src/exam/entity/exam.entity";
import { Users } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Execution {
    @PrimaryGeneratedColumn('uuid', {name: 'execution_id'})
    executionId: string;

    @Column({ name: 'current_question', nullable: true})
    currentQuestion: string;

    @Column({name: 'start_time'})
    timeStart: string;

    @Column({name: "end_time", nullable: true})
    timeEnd: string;

    @Column({nullable: true})
    duration: string;

    @Column()
    score: number;

    @Column({name: "max_score"})
    maxScore: number;

    @Column()
    passed: boolean;

    @Column()
    status: string;

    @Column({name: "created_at"})
    createdAt: string;

    @Column({name: "updated_at"})
    updatedAt: string;

    @Column({name: "user_id"})
    userId: number;

    @Column({name: "exam_id"})
    examId: number;

    @ManyToOne(() => Users, (user) => user.executions)
    user: Users;

    @ManyToOne(() => Exam, (exam) => exam.executions)
    exam: Exam;


}
