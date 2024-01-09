import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Entity, Column } from 'typeorm';
import { ManyToMany, JoinTable } from 'typeorm';
import { AbstractEntity } from '@app-common/lib';
import { VirtualColumn } from '@app-common/lib';
import { Role } from '../../role/entity/role.entity';

@Entity()
export class User extends AbstractEntity {
  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'varchar', length: 120 })
  public email: string;

  @Column({ default: false })
  public isDeleted: boolean;

  /**
   * @description: Virtual fields
   */

  public expired: string;

  @VirtualColumn()
  public fullName: string;

  /**
   * @description: Relations
   */

  @ManyToMany(() => Role, (role) => role.users, { cascade: ['update'] })
  @JoinTable({ name: 'relation_user_role' })
  roles: Role[];

  /**
   * @description: Create and Update Date Columns
   */

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
