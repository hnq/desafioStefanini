import path from 'path';
import serve from 'koa-static';

const staticPath = path.join(process.cwd(), 'public');

export default app => {
  app.use(serve(staticPath));
}
