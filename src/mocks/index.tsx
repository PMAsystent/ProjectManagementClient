import { auth } from 'mocks/handlers/auth';
import { projects } from './handlers/project';
import { users } from './handlers/user';
import { tasks } from './handlers/tasks';

export const handlers = [...auth, ...projects, ...users, ...tasks];
