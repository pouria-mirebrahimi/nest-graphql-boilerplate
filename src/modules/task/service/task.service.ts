import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class TaskService {
  constructor(private readonly userService: UserService) {}

  private readonly logger = new Logger(TaskService.name);

  @Cron('45 * * * * *', { name: 'logger' })
  handleCron() {
    this.logger.debug('Called when the current second is 45.');
  }

  @Interval(10000)
  handleInterval() {
    this.logger.debug('Called every 10 seconds.');
  }

  @Timeout('notification', 5000)
  handleTimeout() {
    (async () => {
      const users = await this.userService.fetchAllUsersView();
      this.logger.debug(`The ${users.length} user(s) added.`);
    })();
    this.logger.debug('Called once after 5 seconds.');
  }
}
