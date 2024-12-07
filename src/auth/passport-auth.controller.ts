import { Controller, Get, HttpCode, HttpStatus, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { PassportJwtAuthGuard } from './guards/passport-jwt.guard';

@Controller('authv2')
export class PassportAuthController {
    constructor(private readonly authService: AuthService) {}

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
