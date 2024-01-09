import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsNotEmptyObject } from 'class-validator';
import { Mapped } from '../../../common/lib/decorator/map.decorator';
import { Admin } from '../entity/admin.entity';
import { Unique } from '../../../common/lib/decorator/unique.decorator';
import { AddPrefix } from '../../../common/lib/transformer/username.transformer';
import { JsonParse } from '../../../common/lib/transformer/json.transformer';
import { MinYears } from '../../../common/lib/decorator/date.decorator';
import { NotExpired } from '../../../common/lib/decorator/date.decorator';

export class filterDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  sorting?: string;
}

export class getAdminOptions {
  // @Validate(IdExists, [Admin])
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @Validate(Unique, [Admin, 'email'])
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @AddPrefix('@')
  @IsString()
  username: string;

  @JsonParse()
  @IsNotEmptyObject()
  filter: filterDto;

  @MinYears({ years: 4 })
  @IsDateString()
  dateOfBirth: string;

  @NotExpired()
  @IsDateString()
  expiration: string;
}

export class GetAdminOutputDto {
  @Mapped() id: number;
  @Mapped() name: string;
  @Mapped() username: string;
  @Mapped(() => filterDto)
  filter: filterDto;
}
