import Router from '@koa/router';
import strongParams from 'params';

const HttpMethod = {
  HEAD: 'head',
  OPTIONS: 'options',
  GET: 'get',
  PUT: 'put',
  PATCH: 'patch',
  POST: 'post',
  DELETE: 'delete',
  ALL: 'all',
};

const route = (
  path,
  method,
  ...middleware
) => (target, prop, descriptor) => {
  if (!target.router) target.router = new Router();

  if (!target.router[method]) {
    throw new Error('@route decorator "method" is not valid');
  }

  target.router[method](
    path,
    ...middleware,
    async (ctx, next) => {
      const controllerInstance = new target.constructor();
      controllerInstance.ctx = ctx;
      controllerInstance.next = next;
      controllerInstance.params = strongParams(ctx.params);
      controllerInstance.params.all = () => ctx.params;

      await controllerInstance[descriptor.value.name]();
      await next();
    }
  );
}

export {
  route,
  HttpMethod,
}
