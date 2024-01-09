import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { interval, map, Observable } from 'rxjs';
import { UserRepository } from '../repository/user.repository';
import { MessageEvent } from '../dto/sse.dto';

@Injectable()
export class UserSseService {
  private readonly logger = new Logger(UserSseService.name);

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository,
  ) {}

  public testSseFunctionality(): Observable<MessageEvent> {
    this.logger.debug('Calling the Sse method.');
    return interval(1000).pipe(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      map((_) => ({
        data: { id: 5 },
      })),
    );
  }
}
