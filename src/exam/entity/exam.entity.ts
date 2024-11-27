import { Answers } from 'src/answers/entity/answers.entity';
import { Execution } from 'src/executions/entities/execution.entity';
import { Questions } from 'src/questions/entity/questions.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn({ name: 'exam_id' })
  examId: string;

  @Column({ nullable: true })
  time: string;

  @Column({ name: 'created_at' })
  createdAt: string;

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
