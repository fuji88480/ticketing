import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@bosstickets/common';
import { createChargeRouter } from './route/new';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // supertestのための対応
    // 'test'ならfalse、それ以外ならtrueを設定

    // https未対応のため
    // secure: process.env.NODE_ENV !== 'test',
    secure: false,
  }),
);
app.use(currentUser);

app.use(createChargeRouter);

app.all('/{*splat}', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
