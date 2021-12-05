import { rest } from 'msw';
import { db } from '../db';

export const projects = [
  rest.get(`/MyProjects`, (req, res, ctx) => {
    db.project.create();
    db.step.create();
    const project = db.project.getAll();
    const step = db.step.getAll();
    const response = {
      projectsList: [
        {
          ...project,
          steps: [step],
        },
      ],
      count: 1,
    };

    return res(ctx.status(200), ctx.json(response));
  }),
];
