import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '@app-common/lib';
import { UserView } from '../view/user.view';

@Injectable()
export class UserViewRepository extends AbstractRepository<UserView> {
  constructor(private dataSource: DataSource) {
    super(UserView, dataSource);
  }
}
