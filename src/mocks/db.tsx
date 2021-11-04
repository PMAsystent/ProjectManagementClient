import { factory, primaryKey } from '@mswjs/data';
import faker from 'faker';

faker.seed(123);

export const db = factory({
  user: {
    id: primaryKey(faker.datatype.uuid),
    name: () => 'John Doe',
    email: () => 'doe@test.com',
    password: () => 'Zaq12wsx!',
  },
});
