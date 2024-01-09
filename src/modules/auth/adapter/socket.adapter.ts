import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
// service
import { AuthService } from '../service/auth.service';

export class AuthIoAdapter extends IoAdapter {
  private authService: AuthService;
  constructor(private app: INestApplicationContext) {
    super(app);
    app.resolve<AuthService>(AuthService).then((authService) => {
      this.authService = authService;
    });
  }

  createIOServer(port: number, options?: ServerOptions): any {
    options.allowRequest = async (request: any, allowFunction) => {
      const token = request.headers.authorization?.replace('Bearer ', '');
      if (token) {
        const verified = this.authService.validateUser(token);
        if (verified) {
          return allowFunction(null, true);
        }
      }

      return allowFunction('Unauthorized', false);
    };

    return super.createIOServer(port, options);
  }
}
