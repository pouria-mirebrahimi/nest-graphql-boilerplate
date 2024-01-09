import { HttpStatus, UnauthorizedException } from '@nestjs/common';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';
// service
import { AuthService } from '../../service/auth.service';

@Injectable()
export class JWTWebsocketAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ws = context.switchToWs().getClient();
    const { authorization, ...rest } = ws.handshake.headers;
    const token = this.authTokenAsBearer(authorization);

    (async () => {
      const user = await this.validate({ login: token });
      ws.conn.user = user;
    })();

    const headers = {
      headers: {
        authorization,
        ...rest,
      },
    };

    return headers;
  }

  private async validate(payload: { login: string }): Promise<any> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new WsException('Invalid token.');
    }
    return user;
  }

  private authTokenAsBearer(authString: string): string {
    const [type, token] = authString?.split(' ');
    if (type !== 'Bearer')
      throw new BadRequestException('Only bearer token is supported.');
    return token;
  }
}
