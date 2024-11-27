import { Exam } from 'src/exam/entity/exam.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Questions {
  @PrimaryGeneratedColumn({ name: 'question_id' })
  questionId: string;

  @Column({ name: 'exam_id' })
  examId: string;

  @Column({ name: 'question_content' })
  question: string;

  @Column('varchar', { array: true })
  answers: string[];

  @Column('varchar', {name: 'correct_answer', nullable: false})
  correctAnswer: string;

  @ManyToOne(() => Exam, (exam) => exam.questions)
  @JoinColumn({ name: 'exam_id' })
  exam: Exam;

  // @OneToOne(() => Answers, (answer) => answer.questions, {cascade: true})
  // @JoinColumn({ name: 'question_id' })
  // correctAnswer: Answers;
}
