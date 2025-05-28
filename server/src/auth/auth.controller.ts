import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import { DeleteUserDto } from './dto/delete.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    await this.authService.login(body, res);
    return { message: 'Logged in successfully' };
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const user = await this.authService.register(body);
    return {
      message: 'User registered successfully',
      user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    this.authService.logout(res);
    return { message: 'Logged out successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  @HttpCode(200)
  async deleteByEmail(@Body() dto: DeleteUserDto) {
    const deleted = await this.authService.deleteUserByEmail(dto.email);
    return {
      message: `User ${deleted.email} deleted successfully`,
      email: deleted.email,
    };
  }
}
