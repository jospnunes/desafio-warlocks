import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterRequestDto, RegisterResponseDto } from './dto/register.dto';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registra um novo usuário' })
  async register(
    @Body() registerDto: RegisterRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<RegisterResponseDto> {
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException('As senhas não coincidem');
    }
    const result = await this.authService.register(
      registerDto.email,
      registerDto.password,
    );

    res.cookie('token', result.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    if (process.env.NODE_ENV !== 'production') {
      return result;
    }
    return { message: 'Usuário registrado com sucesso' };
  }

  @Post('login')
  @ApiOperation({ summary: 'Faz login na aplicação' })
  async login(
    @Body() loginDto: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponseDto> {
    console.log('loginDto', loginDto);
    const result = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

    res.cookie('token', result.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      partitioned: true,
    });
    if (process.env.NODE_ENV !== 'production') {
      return result;
    }
    return { message: 'Login efetuado com sucesso' };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Faz logout na aplicação' })
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      partitioned: true,
    });
    return { message: 'Logout efetuado com sucesso' };
  }
}
