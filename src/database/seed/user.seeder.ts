import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
// entity
import { User } from '../../modules/user/entity/user.entity';
import { Role } from '../../modules/role/entity/role.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const roleRepository = dataSource.getRepository(Role);
    await roleRepository.insert([
      { title: 'ADMIN' },
      { title: 'USER' },
      { title: 'SCHOOL' },
      { title: 'TUTOR' },
      { title: 'STUDENT' },
    ]);

    // const repository = dataSource.getRepository(User);
    // await repository.insert([
    //   {
    //     name: 'Caleb Barrows',
    //     email: 'caleb.barrows@gmail.com',
    //     roles: [<any>{ id: 1 }],
    //   },
    // ]);

    // ---------------------------------------------------

    const userFactory = factoryManager.get(User);

    // save 1 factory generated entity, to the database
    // await userFactory.save();

    // save 5 factory generated entities, to the database
    await userFactory.saveMany(5);
  }
}
