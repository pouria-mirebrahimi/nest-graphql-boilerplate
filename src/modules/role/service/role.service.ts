import { InjectRepository } from '@nestjs/typeorm';
// repository
import { RoleRepository } from '../repository/role.repository';
import { UserRepository } from '../../user/repository/user.repository';
// entity
import { Role } from '../entity/role.entity';
// dto
import { HttpResponseDto } from '../../../common/lib/dto/response.dto';
import { CreateRoleDto } from '../dto/role.dto';
import { User } from '../../user/entity/user.entity';
import { In } from 'typeorm';

export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async createRole(roleDetails: CreateRoleDto): Promise<HttpResponseDto> {
    const newEntity = await this.roleRepository.queryCreate(roleDetails);
    return {
      status: 201,
      message: 'A role created.',
      data: {
        id: newEntity.id,
      },
    };
  }

  async fetchAllRoles(): Promise<Role[]> {
    const found = await this.roleRepository.queryManyByOption({
      relations: ['users'],
    });

    return found;
  }

  async addUserToRole(id: number, userId: number): Promise<HttpResponseDto> {
    const updateResult = await this.roleRepository.queryAddUserToRole(
      {
        relations: ['users'],
        where: {
          users: { id: userId },
        },
      },
      <User>{ id: userId },
    );

    const message = `${
      updateResult.affected === 1 ? 'One' : 'Zero'
    } user added to role.`;

    return {
      status: 200,
      message,
      data: {
        role: id,
        user: userId,
      },
    };
  }
}
