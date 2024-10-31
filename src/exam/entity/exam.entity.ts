import { Answers } from 'src/answers/entity/answers.entity';
import { Execution } from 'src/executions/entities/execution.entity';
import { Questions } from 'src/questions/entity/questions.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ExecutionIds } from '../exam-types';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn({ name: 'exam_id' })
  examId: number;

  @Column({ nullable: true })
  time: number;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column()
  level: number;

  @Column({ name: 'questions_amount' })
  questionsAmount: number;

  @Column({ name: 'answers_amount' })
  answersAmount: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  status: string;

  @OneToMany(() => Questions, (questions) => questions.exam)
  questions: Questions[];

  @OneToMany(() => Answers, (answers) => answers.exam)
  answers: Answers[];

  @OneToMany(() => Execution, (execution) => execution.exam)
  executions: Execution[];

}
