import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  WelcomeMessage(): string {
    return 'Welcome message  will be here soon.. Or maybe not..';
  }
}
