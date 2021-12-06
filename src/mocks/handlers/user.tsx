import { rest } from 'msw';

export const users = [
  rest.get('/Users/findUsers', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        users: [
          {
            id: 2,
            userName: 'test',
            email: 'test@example.com',
          },
        ],
        count: 1,
      })
    );
  }),
];
