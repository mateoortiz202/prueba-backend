import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHelloPersonal(): string {
    return 'Hello Mateo!';
  }
}
