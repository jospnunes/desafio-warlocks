import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterRequestDto {
  @IsEmail({}, { message: 'Insira um email válido' })
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;

  @IsNotEmpty({ message: 'Confirmação de senha é obrigatória' })
  confirmPassword: string;
}

export class RegisterResponseDto {
  token?: string;
  message?: string;
}
