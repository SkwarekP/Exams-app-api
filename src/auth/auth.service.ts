import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LogInDto } from './Dto/logInDto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthRes, SignIn } from './auth.types';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private readonly userService: UsersService,
    ) {}

    async authenticate(credentials: LogInDto) {
        try {
            const user = await this.validateUser(credentials);

            if(!user) {
                throw new UnauthorizedException();
            }

            return await this.signIn({userId: user.userId, username: user.username})
            
        } catch (error) {

        }

    }

    async validateUser(userDto: LogInDto): Promise<User> {

        try {
            const user = await this.userService.getUserByName(userDto.username);
            const isPasswordMatched = await bcrypt.compare(userDto.password, user.password);
            
            if(!isPasswordMatched){
                throw new UnauthorizedException("Invalid password")
            }
            
            return user;

        } catch (error) {
            throw new UnauthorizedException("Invalid credentials")
        }        
    }

    async signIn(user: SignIn): Promise<AuthRes> {
        const tokenPayload = {
            sub: user.userId,
            username: user.username
        }

        const accessToken = await this.jwtService.signAsync(tokenPayload);

        return {
            accessToken,
            username: user.username,
            userId: user.userId
        }
    }
}
