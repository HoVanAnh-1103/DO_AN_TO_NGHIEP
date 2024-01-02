import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { log } from 'console';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    console.log(user, email, pass);

    if (!(await bcrypt.compare(pass.toString(), user?.password))) {
      throw new UnauthorizedException();
    }

    const { password, id, verify, activity, roles, ...result } = user;

    const rolesArr = roles.map((role) => role.name);
    const payload = {
      username: user.fullName,
      sub: user.id,
      ...result,
      roles: rolesArr,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
