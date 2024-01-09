import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { NotFoundException } from '@nestjs/common';
import { DataSource, DeleteResult } from 'typeorm';
import { FindOneOptions, EntityTarget } from 'typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { FindOptionsWhere, ObjectId } from 'typeorm';
import { DeepPartial, FindManyOptions } from 'typeorm';
import { AbstractEntity } from './abstract-entity';

export abstract class AbstractRepository<
  Entity extends AbstractEntity,
> extends Repository<Entity> {
  constructor(target: EntityTarget<Entity>, dataSource: DataSource) {
    super(target, dataSource.createEntityManager());
  }

  async queryOneById(id: number): Promise<Entity> {
    try {
      const found = await this.findOne({
        where: { id },
      } as FindOneOptions<Entity>);
      return found;
    } catch (e: any) {
      throw new NotFoundException();
    }
  }

  async queryOneByOption(option: FindOneOptions<Entity>): Promise<Entity> {
    try {
      const found = (await this.findOne(option)) as Entity;
      return found;
    } catch (e: any) {
      throw new NotFoundException();
    }
  }

  async queryManyByOption(option: FindManyOptions<Entity>): Promise<Entity[]> {
    const found = (await this.find(option)) as Entity[];
    return found;
  }

  async queryCreate(entityLike: DeepPartial<Entity>): Promise<Entity> {
    const entity = this.create(entityLike);
    return (await entity.save()) as Entity;
  }

  async queryUpdate(
    criteria:
      | string
      | number
      | FindOptionsWhere<Entity>
      | Date
      | ObjectId
      | string[]
      | number[]
      | Date[]
      | ObjectId[],
    partialEntity: QueryDeepPartialEntity<Entity>,
  ): Promise<UpdateResult> {
    const updateResult = await this.update(criteria, partialEntity);
    return updateResult;
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
      | FindOptionsWhere<Entity>,
  ): Promise<DeleteResult> {
    return await this.delete(criteria);
  }
}
