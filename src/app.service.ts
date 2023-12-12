import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    this.logger.log("Hellllasdasdlo",{Data: process.env.DATABASE_USER, number1:44112323})
    return 'Hello'
  }
}
