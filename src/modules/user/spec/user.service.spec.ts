import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

// locals
import { UserService } from '../service/user.service';
import { UserRepository } from '../repository/user.repository';
import { UserViewRepository } from '../repository/user.view.repository';
import mockUsers from './mock-users';

describe('User ::: testing service', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  const mockUserViewRepository = {
    queryAllEntities: jest.fn(() => mockUsers),
  };
  const mockUserRepository = {
    queryAllEntities: jest.fn(() => mockUsers),
    queryOneById: jest.fn((id) => {
      const entity = mockUsers.filter((user) => user.id === id);
      if (entity.length === 0) return Promise.reject('Not Found');
      return entity;
    }),
    queryOneByOption: jest.fn((option) => {
      const id = option.where.id;
      const entity = mockUsers.filter((user) => user.id === id);
      if (entity.length === 0) return [];
      return entity;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(UserViewRepository),
          useValue: mockUserViewRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(
      getRepositoryToken(UserRepository),
    );
  });

  xit('should be defined', () => {
    expect(userService).toBeDefined();
  });

  xit('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  xit('should be called and return two user items', async () => {
    const found = await userService.fetchAllUsers();
    expect(found).toEqual(mockUsers);

    expect(mockUserRepository.queryAllEntities).toHaveBeenCalled();
  });

  xit('should be called and return a user item based on ID', async () => {
    const id = 1;
    const mockUser = mockUsers.filter((user) => user.id === id);
    const found = await userService.fetchUserById(id);
    expect(found).toEqual(mockUser);

    expect(mockUserRepository.queryOneByOption).toHaveBeenCalledWith({
      relations: ['roles'],
      where: {
        id,
      },
    });
  });
});
