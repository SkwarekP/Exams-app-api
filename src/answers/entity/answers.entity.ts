import { Exam } from 'src/exam/entity/exam.entity';
import { Questions } from 'src/questions/entity/questions.entity';
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
  answerId: string;

  @Column({ name: 'correct_answer' })
  correctAnswer: string;

  @Column({ name: 'exam_id' })
  examId: string;

  @ManyToOne(() => Exam, (exam) => exam.answers)
  @JoinColumn({ name: 'exam_id' })
  exam: Exam;

  @OneToOne(() => Questions, (question) => question.questionId)
  @JoinColumn({name: 'answer_id'})
  questions: Questions;
}
