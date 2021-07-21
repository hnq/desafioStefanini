import Router from "@koa/router";
import appConfig from "./../config/App";
import jwt from "koa-jwt";
import AuthConfig from "../config/Auth";

const routes = [];
const rootRouter = new Router();

const addResource = (router, path, name, { is_private } = {}) => {
  const controller = require(`./../app/controllers/${name}`);
  const controllerRouter = new controller.default().router;

  router.use(
    path,
    ...(is_private ? [jwt({ secret: AuthConfig.jwt.secret })] : []),
    controllerRouter.routes(),
    controllerRouter.allowedMethods()
  );
};

const resources = (path, name, { is_private } = {}) => {
  addResource(rootRouter, path, name, {
    is_private,
  });
};

const namespace = (prefix, namespaceResources) => {
  const router = new Router({ prefix: `${appConfig.path}${prefix}` });

  const controllers = [];
  namespaceResources((path, name, { is_private } = {}) =>
    controllers.push({
      path,
      name,
      options: {
        is_private,
      },
    })
  );

  for (var i = 0, len = controllers.length; i < len; i++) {
    const { path, name, options } = controllers[i];

    addResource(router, path, name, options);
  }

  routes.push(router);
};

routes.push(rootRouter);

export { namespace, resources, routes, Router };
