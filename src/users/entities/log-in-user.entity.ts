import { Exclude } from "class-transformer";
import { IsEmail } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('auth-users')
export class AuthUser {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  password: string; 
}