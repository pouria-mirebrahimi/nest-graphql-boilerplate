import { ApiTags } from '@nestjs/swagger';
// locals
import { Controller, Post } from '@nestjs/common';

@ApiTags('auth')
@Controller({ path: 'auth', version: ['1'] })
export class AuthController {
  @Post('/sign/in')
  async signin(): Promise<void> {
    return;
  }

  @Post('/sign/up')
  async signup(): Promise<void> {
    return;
  }
}
