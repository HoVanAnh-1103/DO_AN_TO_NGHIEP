import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/auth';
import { Role } from './guards/role.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('profile')
  @Public()
  getProfile(@Request() req) {
    return req.user;
  }
}
