import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../modules/user/entity/user.entity';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  const firstName = faker.name.firstName('male');
  const lastName = faker.name.lastName('male');
  user.name = `${firstName} ${lastName}`;
  user.email = faker.internet.email(lastName);

  user.roles = faker.helpers
    .arrayElements([1, 2, 3, 4, 5], 1)
    .map((item) => <any>{ id: item });

  return user;
});
