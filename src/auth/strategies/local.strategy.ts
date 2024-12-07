import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { LogInDto } from "../Dto/logInDto";
import { AuthService } from "../auth.service";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService){
        super({
            usernameField: 'username',
            passwordField: 'password'
        });
    }
    async validate(username: string, password: string): Promise<User> {
        const credentials = {
            username,
            password
        }
        
        const user = await this.authService.validateUser(credentials)

        if(!user){
            throw new UnauthorizedException();
        }
        
        return user;

    }
}