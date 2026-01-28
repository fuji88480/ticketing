import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@bosstickets/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';

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

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('/{*splat}', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
