import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class LogInDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}