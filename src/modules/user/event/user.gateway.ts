import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import { ConnectedSocket, WebSocketGateway } from '@nestjs/websockets';
import { MessageBody, SubscribeMessage } from '@nestjs/websockets';
import { AbsEventGateway } from '../../../common/lib/gateway/gateway';
import { WebSocketEventEnum } from '../../../common/lib/enum/event.enum';
import { UserViewRepository } from '../repository/user.view.repository';
import { UseGuard } from '../../../common/lib/decorator/guard.decorator';
import { JWTWebsocketAuthGuard } from '../../auth/guard/jwt/auth.ws.guard';

@WebSocketGateway({
  namespace: 'user/event',
  cors: { origin: '*' },
})
export class UserEventGateway extends AbsEventGateway {
  private readonly logger = new Logger(UserEventGateway.name);

  @InjectRepository(UserViewRepository)
  private readonly userRepo: UserViewRepository;

  @UseGuard(JWTWebsocketAuthGuard)
  @SubscribeMessage(WebSocketEventEnum.TEST)
  async onTest(
    @ConnectedSocket() client: any,
    @MessageBody() data: string | object,
  ): Promise<string> {
    this.logger.debug('onTest', client.conn.user);
    // const found = await this.userRepo.queryAllEntities();
    // console.log(found);

    // console.log(client.id);
    // console.log(client.handshake.query?.deviceId?.toString());
    // console.log(client.handshake.query?.lessonId?.toString());
    return `data: ${data}`;
  }
}
