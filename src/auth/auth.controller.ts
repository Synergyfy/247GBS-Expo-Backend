import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() data: any) {
        return this.authService.register(data);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() data: any) {
        return this.authService.login(data);
    }
}
