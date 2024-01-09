import { EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import { Logger } from '@nestjs/common';
import { User } from '../entity/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  private readonly logger = new Logger(UserSubscriber.name);

  listenTo() {
    return User;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async afterLoad(user: User): Promise<void> {
    try {
      // TODO add your subscriber routines here
    } catch (e: any) {
      this.logger.error(e.message);
    }
  }
}
