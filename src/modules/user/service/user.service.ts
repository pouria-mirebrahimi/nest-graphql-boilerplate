import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UserView } from '../view/user.view';
import { UserRepository } from '../repository/user.repository';
import { UserViewRepository } from '../repository/user.view.repository';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository,
    @InjectRepository(UserViewRepository)
    private readonly userViewRepo: UserViewRepository,
  ) {}

  /**
   * @description   Fetching all users using the base repository
   *                queries defined in the repository of User.
   *
   * @returns       A list of all user entities.
   */
  async fetchAllUsers(): Promise<User[]> {
    return await this.repository.queryAllUsersAndCountRoles();
  }

  /**
   * @description   This method is similar to the fetchAllUsers,
   *                but this uses the view entity.
   *
   * @returns       A list of all user entities
   */
  async fetchAllUsersView(): Promise<UserView[]> {
    return await this.userViewRepo.queryManyByOption({});
  }

  /**
   *
   * @description   This method takes an id and returns
   *                the related user instance.
   *
   * @param id      User id
   * @returns       A specific user or throw an error
   */
  async fetchUserById(id: number): Promise<User> {
    const found = await this.repository.queryOneById(id);
    return found;
  }

  /**
   * @description   This method saves a user instance in the
   *                user table.
   *
   * @param body    Partial instance of user entity
   * @returns       A user instance
   */
  async createUser(body: CreateUserDto): Promise<User> {
    return await this.repository.createEntity(body);
  }
}
