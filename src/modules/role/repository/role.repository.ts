import { FindOneOptions, DeleteResult } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DataSource, DeepPartial, FindManyOptions } from 'typeorm';
import { FindOptionsWhere, ObjectId, UpdateResult } from 'typeorm';
// entity
import { Role } from '../entity/role.entity';
import { User } from '../../user/entity/user.entity';
// repository
import { AbstractRepository } from '../../../common/lib/repository/abstract-repository';

@Injectable()
export class RoleRepository extends AbstractRepository<Role> {
  constructor(private dataSource: DataSource) {
    super(Role, dataSource);
  }

  async queryOneByOption(option: FindOneOptions): Promise<Role | undefined> {
    const found = await this.findOne(option);
    return found;
  }

  async queryOneById(id: number): Promise<Role | undefined> {
    const found = await this.findOneBy({ id });
    if (!found) throw new NotFoundException();
    return found;
  }
  async queryManyByOption(option: FindManyOptions): Promise<Role[]> {
    const found = await this.find(option);
    return found;
  }

  async queryCreate(entityLike: DeepPartial<Role>): Promise<Role | undefined> {
    const newEntity = this.create(entityLike);
    return await this.save(newEntity);
  }

  async queryAppendById(id: number, item: any) {
    return await this.dataSource
      .createQueryBuilder()
      .update(Role)
      .set({
        users: () => `array_append("users", ${item})`,
      })
      .where('id = :id', { id: id })
      .execute();
  }

  async queryUpdate(
    criteria:
      | string
      | number
      | FindOptionsWhere<Role>
      | Date
      | ObjectId
      | string[]
      | number[]
      | Date[]
      | ObjectId[],
    partialEntity: QueryDeepPartialEntity<Role>,
  ): Promise<UpdateResult> {
    const updateResult = await this.update(criteria, partialEntity);
    return updateResult;
  }

  async queryAddUserToRole(
    option: FindOneOptions,
    userEntity: QueryDeepPartialEntity<User>,
  ): Promise<UpdateResult> {
    const found = await this.queryOneByOption(option);

    if (!found) {
      found.users.push(<User>{ id: userEntity.id });
      await this.save(found);
    }

    return {
      raw: undefined,
      generatedMaps: [],
      affected: found ? 0 : 1,
    };
  }

  async queryDelete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<Role>,
  ): Promise<DeleteResult> {
    return await this.delete(criteria);
  }
}
