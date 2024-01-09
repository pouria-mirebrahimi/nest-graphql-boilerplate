import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '@app-common/lib';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource);
  }

  async queryAllUsersAndCountRoles(): Promise<User[]> {
    const queryBuilder = this.createQueryBuilder('user');
    const found = await queryBuilder
      .leftJoinAndSelect('user.roles', 'role')
      .loadRelationCountAndMap('user.rolesCount', 'user.roles')
      .addSelect("CONCAT(user.name, ' | ', user.email)", 'fullName')
      .getMany();

    return found;
  }

  async createEntity(body: CreateUserDto): Promise<User> {
    return this.queryCreate(body);
  }
}
