import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// locals
import { AdminRepository } from '../repository/admin.repository';
import { User } from '../../user/entity/user.entity';

@Injectable()
export class AdminService {
  @InjectRepository(AdminRepository)
  private readonly repository: AdminRepository;

  async getAdminUser(id: number, userInfo: any): Promise<void> {
    return;
  }

  // async onlyAdminRequest(id: number): Promise<User> {
  //   return await this.repository.queryOneById(id);
  // }
}
