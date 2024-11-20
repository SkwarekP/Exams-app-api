import { Exam } from 'src/exam/entity/exam.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Answers {
  @PrimaryGeneratedColumn({ name: 'answer_id' })
  answerId: number;

  @Column({ name: 'correct_answer' })
  correctAnswer: string;

  @Column({ name: 'exam_id' })
  examId: string;

  @ManyToOne(() => Exam, (exam) => exam.answers)
  @JoinColumn({ name: 'exam_id' })
  exam: Exam;

  // @OneToOne(() => Questions)
  // @JoinColumn({name: 'answer_id'})
  // questions: Questions[]
}
