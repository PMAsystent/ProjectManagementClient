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
  project: {
    id: primaryKey(faker.datatype.uuid),
    name: () => 'Project',
    dueDate: () => '2021-12-05T12:13:59.635Z',
    isActive: () => true,
    progressPercentage: () => 50,
    steps: () => [],
  },
  step: {
    id: primaryKey(faker.datatype.uuid),
    name: () => 'step',
    progressPercentage: () => 50,
  },
});
