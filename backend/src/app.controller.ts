import { Body, Controller, Get, Logger, Post, Request, Response as ResponseAnno } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorators/auth';
import { Response } from 'express';
import { ROLES_KEY, Roles } from './decorators/roles.decorator';
import { Role } from './modules/auth/guards/role.enum';

@Controller()
@Roles(Role.Student)
export class AppController {
  constructor(private readonly appService: AppService) { }
  private readonly logger = new Logger(AppService.name);
  @Public()

  @Post()
  @Get()
  getHello( @Body() data): string {
    this.logger.log("GET APIasas", data)

    
    return this.appService.getHello();
  }
  @Get('me')
  getMe(@Request() req){
    return req.user;

  }

}
