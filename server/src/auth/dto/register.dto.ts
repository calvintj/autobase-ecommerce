import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
import { $Enums } from '../../../generated/prisma';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsEnum($Enums.Role)
  role?: $Enums.Role;
}
