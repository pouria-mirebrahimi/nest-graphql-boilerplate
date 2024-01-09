import { TestingModule, Test } from '@nestjs/testing';

// locals
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';

describe('User ::: testing controller', () => {
  let controller: UserController;

  const mockUsersService = {
    fetchUserById: jest.fn().mockImplementationOnce((id: number) => {
      return {
        id,
        name: 'johnDoe',
        email: 'johndoe@example.com',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a user by id', async () => {
    const found = await controller.getUser(1);
    expect(found.id).toEqual(1);
  });
});
