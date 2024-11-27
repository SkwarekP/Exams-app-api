import { Exam } from 'src/exam/entity/exam.entity';
import { Users } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExecutionAnswers, ExecutionStatus } from '../executions.types';

@Entity()
export class Execution {
  @PrimaryGeneratedColumn('uuid', { name: 'execution_id' })
  executionId: string;

  @Column({ name: 'current_question', nullable: true })
  currentQuestion: string;

  @Column({name: "current_question_id", type: "uuid"})
  currentQuestionId: string;

  @Column({ name: 'execution_end_time', nullable: true })
  executionEndTime: string;

  @Column({ nullable: true })
  duration: string;

  @Column()
  score: number;

  @Column({ name: 'max_score' })
  maxScore: number;

  @Column({ nullable: true })
  passed: boolean;

  @Column()
  status: ExecutionStatus;

  @Column({name: 'answered_questions_amount'})
  answeredQuestionsAmount: number;

  @Column({type: 'jsonb', nullable: true})
  answers: ExecutionAnswers[]

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'exam_id' })
  examId: string;

  @Column({name: 'created_at'})
  createdAt: string;

  @ManyToOne(() => Users, (user) => user.executions)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Exam, (exam) => exam.executions)
  @JoinColumn({ name: 'exam_id' })
  exam: Exam;
}
