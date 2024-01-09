import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
// locals
import { AuthService } from '../../service/auth.service';
import { jsonConfig } from '../../../../common/helper/config.helper';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    @Inject(ConfigService)
    private readonly config: ConfigService,
  ) {
    const NodeEnv = config.get<string>('NODE_ENV');
    const JWT: object = jsonConfig(NodeEnv, 'JWT');
    const secret = JWT?.['access-token']?.secret;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: secret,
      passReqToCallback: true,
    });
  }

  private async validate(payload: JwtPayload): Promise<any> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}

export interface JwtPayload {
  login: string;
}
