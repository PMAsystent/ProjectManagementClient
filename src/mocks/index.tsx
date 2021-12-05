import { auth } from 'mocks/handlers/auth';
import { projects } from './handlers/project';

export const handlers = [...auth, ...projects];
