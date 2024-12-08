import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import { UserResponseDto } from "src/users/dto/user-response.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: {sub: string}): Promise<UserResponseDto> {
        const validatedUser = await this.userService.getUser(payload.sub)

        if(!validatedUser){
            throw new UnauthorizedException("User not found or unauthorized");
        }

        const {password, ...result} = validatedUser;

        return result;
    }
}