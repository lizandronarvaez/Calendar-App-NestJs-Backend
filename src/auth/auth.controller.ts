import { Controller, Get, Post, Body, HttpCode, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, LoginAuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  user_create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.user_create(createAuthDto);
  }

  @Post('login')
  @HttpCode(200)
  user_login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.user_login(loginAuthDto);
  }

  @Get('reset')
  user_reset_token(@Headers('Authorization') authorization: string) {
    return this.authService.user_reset(authorization);
  }
}
