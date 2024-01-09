import { Module } from '@nestjs/common';
import { RoleController } from './controller/role.controller';
import { RoleService } from './service/role.service';
import { RoleRepository } from './repository/role.repository';
import { UserRepository } from '../user/repository/user.repository';
import { MapperService } from '../../common/lib/interceptor/mapper/mapper.service';

@Module({
  imports: [],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, UserRepository, MapperService],
  exports: [],
})
export class RoleModule {}
