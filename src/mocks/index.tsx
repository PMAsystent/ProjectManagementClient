import { auth } from 'mocks/handlers/auth';
import { projects } from './handlers/project';
import { users } from './handlers/user';

export const handlers = [...auth, ...projects, ...users];
