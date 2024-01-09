import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '@app-common/lib';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Role extends AbstractEntity {
  @Column()
  title: string;

  /**
   * @description: Relations
   */

  @ManyToMany(() => User, (user) => user.roles, { cascade: ['update'] })
  users: User[];
}
