import { Body, Controller, Post, Res } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response): Promise<{ message: string }> {
    const token = await this.authService.login(body);
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    return { message: 'Logged in' };
  }

  @Post('register')
  async register(@Body() body: RegisterDto): Promise<{ message: string }> {
    return this.authService.register(body);
  }
}

