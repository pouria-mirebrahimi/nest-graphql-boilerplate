import { Post, Controller, Body, UseInterceptors } from '@nestjs/common';
import { Param, ParseIntPipe, Get } from '@nestjs/common';
// service
import { RoleService } from '../service/role.service';
// dto
import { HttpResponseDto } from '../../../common/lib/dto/response.dto';
import { MapInterceptor } from '../../../common/lib/interceptor/mapper/mapper.interceptor';
import {
  CreateRoleDto,
  AddUserToRoleDto,
  RoleOutputDto,
} from '../dto/role.dto';

@Controller({ path: 'privileges/role', version: ['1'] })
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Post('/')
  async createRole(
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<HttpResponseDto> {
    return this.service.createRole(createRoleDto);
  }

  @Post('/:id/user/add')
  async addUserToRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: AddUserToRoleDto,
  ): Promise<HttpResponseDto> {
    return this.service.addUserToRole(id, user.id);
  }

  @Get('/')
  @UseInterceptors(MapInterceptor(RoleOutputDto))
  getAllRoles(): Promise<RoleOutputDto[]> {
    return this.service.fetchAllRoles();
  }
}
