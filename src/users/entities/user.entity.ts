import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../types/user.interface";
import { IsEmail } from "class-validator";
import { Execution } from "src/executions/entities/execution.entity";

@Entity()
export class Users {
    @PrimaryGeneratedColumn({name: "user_id"})
    userId: number;

    @Column()
    username: string;

    @Column({name: "first_name"})
    firstName: string;

    @Column({name: "last_name"})
    lastName: string;

    @Column()
    role: Role;

    @Column({unique: true})
    @IsEmail()
    email: string;

    @CreateDateColumn({name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @OneToMany(() => Execution, (execution) => execution.user)
    executions: Execution[];
}
