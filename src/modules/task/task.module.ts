import { Module } from '@nestjs/common';
// module
import { UserModule } from '../user/user.module';
// service
import { TaskService } from './service/task.service';

/**
 * @description this is for when a module must be imported in the
 *              app module once and be used everywhere in the project.
 */
// @Global()
@Module({
  imports: [UserModule],
  providers: [TaskService],
})
export class TaskModule {}
