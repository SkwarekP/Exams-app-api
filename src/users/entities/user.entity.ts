import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../types/user.interface';
import { IsEmail } from 'class-validator';
import { Execution } from 'src/executions/entities/execution.entity';
import { Exclude } from 'class-transformer';
import { Exam } from 'src/exam/entity/exam.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  userId: string;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  role: Role;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToMany(() => Execution, (execution) => execution.user)
  executions: Execution[];

  @ManyToMany(() => Exam, (exam) => exam.users)
  exams: Exam[];
  
}
