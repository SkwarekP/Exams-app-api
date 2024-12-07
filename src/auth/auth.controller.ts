import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './Dto/logInDto';
import { AuthGuard } from './guards/auth.guard';

@Controller('authv1')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async logIntoTheApplication(
        @Body() credentials: LogInDto
    ) {
        return await this.authService.authenticate(credentials)
    }

    @UseGuards(AuthGuard)
    @Get('session')
    getUserInfo(@Request() req) {
        return req.user
    }
    
}
