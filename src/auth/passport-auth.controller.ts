import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { PassportJwtAuthGuard } from './guards/passport-jwt.guard';
import { Throttle } from '@nestjs/throttler';
import { Public } from './public.decorator';

@Controller('auth')
export class PassportAuthController {
    constructor(private readonly authService: AuthService) {}

    @Throttle({default: {limit: 10, ttl: 60}})
    @Public()
    @Post('login')
    @UseGuards(PassportLocalGuard)
    async logIntoTheApplication(
        @Request() res,
    ) {
        const login = await this.authService.signIn({
            userId: res.user.userId,
            username: res.user.username,
            role: res.user.role
        });
        return login;
    }

    @UseGuards(PassportJwtAuthGuard)
    @Get('session')
    getUserInfo(@Request() req) {
        return req.user;
    }
}
