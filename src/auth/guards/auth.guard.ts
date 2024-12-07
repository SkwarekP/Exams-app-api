import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const authorization = req.headers.authorization;
        const token = authorization?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const tokenRes = await this.jwtService.verifyAsync(token);
            req.user = {
                userId: tokenRes.sub,
                username: tokenRes.username,
            }
            return true;
        } catch (error) {
            throw new UnauthorizedException();
        }

    }
}