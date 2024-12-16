import { Execution } from 'src/executions/entities/execution.entity';
import { Questions } from 'src/questions/entity/questions.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

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

  @OneToMany(() => Execution, (execution) => execution.exam)
  executions: Execution[];

  // @ManyToMany(() => User, (user) => user.exams)
  // users: User[];

  @ManyToMany(() => User, (user) => user.exams)
  @JoinTable({
    name: 'user_exams', // Explicitly specify the join table name here
    joinColumn: {
      name: 'exam_id', // Column in `user_exams` that references `Exam`
      referencedColumnName: 'examId', // Primary key in `Exam`
    },
    inverseJoinColumn: {
      name: 'user_id', // Column in `user_exams` that references `User`
      referencedColumnName: 'userId', // Primary key in `User`
    },
  })
  users: User[];

}
