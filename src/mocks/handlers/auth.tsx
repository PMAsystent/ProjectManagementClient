import { rest, RestRequest } from 'msw';
import { db } from '../db';
import { loginUserType, registerUserType } from '../../core/types/api/auth.types';

export const auth = [
  rest.post(`/Auth/LoginUser`, (req: RestRequest<loginUserType>, res, ctx) => {
    db.user.create();
    const user = db.user.findFirst({
      where: {
        email: {
          equals: req.body.email,
        },
      },
    });
    if (user && user.password === req.body.password) {
      return res(ctx.status(201), ctx.json('askdofnodsafsoanfosda'));
    }

    return res(
      ctx.status(403),
      ctx.json({
        error: 'Nie ma takiego usera',
      })
    );
  }),
  rest.post(`/Auth/RegisterUser`, (req: RestRequest<registerUserType>, res, ctx) => {
    db.user.create({ email: req.body.email, password: req.body.password, name: req.body.userName });
    if (req.body.userName !== 'failed') {
      return res(ctx.status(201), ctx.json(req.body));
    }

    return res(
      ctx.status(403),
      ctx.json({
        error: 'Rejestracja nieudana',
      })
    );
  }),
];
