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
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) { }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('profile')
  @Public()
  async getProfile(@Request() req) {
    const user = req['user']
    const res = await  this.userService.findOneByEmail(user.email) 
    res['sub'] = user['sub']
    return res;
  }
}
