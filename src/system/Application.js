import './Runtime';

import Koa from 'koa';
import koaBody from 'koa-body';
import qs from 'koa-qs';
import logger from 'koa-pino-logger';

import boot from './Boot';
import { useProxy, log } from './../config/App';
import { routes } from './Router';

//LOAD APP ROUTES
import './../config/Routes';
import '../app/concerns/database';

const app = new Koa();

if (log) {
  app.use(
    logger({
      prettyPrint: log.pretty,
    }),
  );
}

qs(app);
app.use(koaBody({ multipart: true }));
app.proxy = useProxy;

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.body = {messages: err.message.split(',').map(m=> m.trim())};
    ctx.status = err.httpStatus || 500;
    ctx.app.emit('error', err, ctx);
  }
});

boot(app);

app.use(async (ctx, next) => {
  const params = Object.assign(
    {},
    ctx.request.body,
    ctx.request.files,
    ctx.query,
    ctx.params
  );

  ctx.params = params;

  await next();
});

app.on('error', err => {
  if (process.env.NODE_ENV != 'test' ) {
    console.error(err);
  }
});

routes.forEach(r => app.use(r.routes()));

export default app;
