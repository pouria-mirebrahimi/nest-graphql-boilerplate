import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
// locals
import { AdminController } from './controller/admin.controller';
import { AdminService } from './service/admin.service';
import { AdminRepository } from './repository/admin.repository';
import { Admin } from './entity/admin.entity';
import { MapperService } from '../../common/lib/interceptor/mapper/mapper.service';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, MapperService],
})
export class AdminModule {}
