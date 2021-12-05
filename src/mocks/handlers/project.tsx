import { rest, RestRequest } from 'msw';
import { db } from '../db';
import { postProjectType } from '../../core/types/api/project.requests.types';

export const projects = [
  rest.get(`/MyProjects`, (req, res, ctx) => {
    db.project.create();
    db.step.create();
    const project = db.project.findFirst({
      where: {
        name: {
          equals: 'Project',
        },
      },
    });
    const step = db.step.getAll();
    const response = {
      projectsList: [{ ...project, steps: [step] }],
      count: 1,
    };

    return res(ctx.status(200), ctx.json(response));
  }),
  rest.post('/MyProjects', (req: RestRequest<postProjectType>, res, ctx) => {
    if (req.body.name === 'Test') {
      return res(
        ctx.status(403),
        ctx.json({
          error: 'Dodanie projektu nie powiodło się',
        })
      );
    }

    return res(
      ctx.status(201),
      ctx.json({
        error: 'Dodanie projektu powiodło się',
      })
    );
  }),
];
