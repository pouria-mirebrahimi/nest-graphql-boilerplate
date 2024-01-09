import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '@app-common/lib';
import { Admin } from '../entity/admin.entity';

@Injectable()
export class AdminRepository extends AbstractRepository<Admin> {
  constructor(private readonly dataSource: DataSource) {
    super(Admin, dataSource);
  }
}
