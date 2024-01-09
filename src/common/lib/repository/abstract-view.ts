import { BaseEntity, ViewColumn } from 'typeorm';

export abstract class AbstractEntity extends BaseEntity {
  @ViewColumn()
  id: number;
}
