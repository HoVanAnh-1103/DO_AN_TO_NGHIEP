import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppService.name);

  @Get()
  getHello(): string {
    
    this.logger.log("GET APIasdas")
    return this.appService.getHello();
  }
}
