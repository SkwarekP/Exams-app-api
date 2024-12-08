import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { PassportJwtAuthGuard } from './guards/passport-jwt.guard';
import { Throttle } from '@nestjs/throttler';
import {Response} from 'express'

@Controller('auth')
export class PassportAuthController {
    constructor(private readonly authService: AuthService) {}

    @Throttle({default: {limit: 10, ttl: 10}})
    @Post('login')
    @UseGuards(PassportLocalGuard)
    async logIntoTheApplication(
        @Request() res,
        @Res({ passthrough: true }) response: Response
    ) {
        const login = await this.authService.signIn({
            userId: res.user.userId,
            username: res.user.username
        });
        response.cookie('authToken', res.accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 1000,
            sameSite: 'strict'
        })

        return login;
    }

    @UseGuards(PassportJwtAuthGuard)
    @Get('session')
    getUserInfo(@Request() req) {
        return req.user;
    }
    

    @Post('logout')
    async logout(@Res() res) {
        res.cookie('authToken', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 0,
          });
          res.status(200).send('Wylogowano!');
    }
}
