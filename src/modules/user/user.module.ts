import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserSseController } from './controller/user.sse.controller';
import { UserService } from './service/user.service';
import { UserSseService } from './service/user.sse.service';
import { AuthService } from '../auth/service/auth.service';
import { UserRepository } from './repository/user.repository';
import { UserViewRepository } from './repository/user.view.repository';
import { UserEventGateway } from './event/user.gateway';

@Module({
  imports: [],
  controllers: [UserController, UserSseController],
  providers: [
    // Service
    UserService,
    UserSseService,
    AuthService,
    // Repository
    UserRepository,
    UserViewRepository,
    // Event
    UserEventGateway,
  ],
  exports: [UserService],
})
export class UserModule {}
