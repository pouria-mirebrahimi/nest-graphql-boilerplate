import { Test, TestingModule } from '@nestjs/testing';
// controller
import { AdminController } from '../controller/admin.controller';
// service
import { AdminService } from '../service/admin.service';
import { MapperService } from '../../../common/lib/interceptor/mapper/mapper.service';

describe('AdminController', () => {
  class UserInfoClass {
    id: number;
    email: string;
  }

  const mockAdminService = {
    getAdminUser: jest
      .fn()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .mockImplementationOnce((id: number, userInfo: UserInfoClass) => {
        return {
          id,
          name: 'john Doe',
          email: 'johndoe@example.com',
        };
      }),
  };

  let controller: AdminController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AdminController],
      providers: [AdminService, MapperService],
    })
      .overrideProvider(AdminService)
      .useValue(mockAdminService)
      .compile();
    controller = module.get<AdminController>(AdminController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be passed', () => {
    const userInfo = { id: 1, email: 'example@domain.com' };
    const mockUser = {
      id: 1,
      name: 'john Doe',
      email: 'johndoe@example.com',
    };
    expect(controller.getUser(1, userInfo)).toEqual(mockUser);
  });
});
