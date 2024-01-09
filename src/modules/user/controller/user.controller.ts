import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Param, ParseIntPipe, Post } from '@nestjs/common';
import { Body, Controller, Get, Inject } from '@nestjs/common';
// locals
import { UserService } from '../service/user.service';
import { User } from '../entity/user.entity';
import { UserView } from '../view/user.view';
import { CreateUserDto } from '../dto/user.dto';

@ApiTags('user')
@Controller({ path: 'user', version: ['1'] })
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get('/')
  public getAllUsers(): Promise<User[]> {
    return this.service.fetchAllUsers();
  }

  @Get('/view')
  public getAllUsersView(): Promise<UserView[]> {
    return this.service.fetchAllUsersView();
  }

  @Get(':id')
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.fetchUserById(id);
  }

  @Post('/')
  @ApiBody({ type: CreateUserDto })
  public createUser(@Body() body: CreateUserDto): Promise<User | undefined> {
    return this.service.createUser(body);
  }
}
