import { Controller, Sse } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable, interval, map } from 'rxjs';
// service
import { UserSseService } from '../service/user.sse.service';
// dto
import { MessageEvent } from '../dto/sse.dto';

@ApiTags('user')
@Controller({ path: '/user/sse/', version: ['1'] })
export class UserSseController {
  constructor(private readonly service: UserSseService) {}

  @Sse('/test')
  sse(): Observable<MessageEvent> {
    console.log('here');
    // return this.service.testSseFunctionality();
    return interval(1000).pipe(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      map((_) => ({
        data: { id: '5' },
      })),
    );
  }
}
