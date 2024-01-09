import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MappedWithEntity } from '../../../common/lib/type/mapper.types';
import { Role } from '../entity/role.entity';
import { Mapped } from '../../../common/lib/decorator/map.decorator';
import { User } from '../../user/entity/user.entity';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}

export class AddUserToRoleDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class UserOutputDto implements MappedWithEntity<User> {
  @Mapped() name: string;
}

export class RoleOutputDto implements MappedWithEntity<Role> {
  @Mapped() title: string;

  @Mapped(() => UserOutputDto)
  @ValidateNested({ each: true })
  @Type(() => UserOutputDto)
  users: UserOutputDto[];
}
