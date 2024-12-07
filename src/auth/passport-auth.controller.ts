import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { PassportJwtAuthGuard } from './guards/passport-jwt.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class PassportAuthController {
    constructor(private readonly authService: AuthService) {}

    @Throttle({default: {limit: 10, ttl: 10}})
    @Post('login')
    @UseGuards(PassportLocalGuard)
    async logIntoTheApplication(
        @Request() req
    ) {
        return await this.authService.signIn({
            userId: req.user.userId,
            username: req.user.username
        });
    }

    @UseGuards(PassportJwtAuthGuard)
    @Get('session')
    getUserInfo(@Request() req) {
        return req.user;
    }
    
}
