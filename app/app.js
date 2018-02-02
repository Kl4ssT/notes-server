import Koa from 'koa';

import router from './routes';
import middlewares from './middlewares/basic';

const app = new Koa();

app
    .use(middlewares())
    .use(router.routes())
    .use(router.allowedMethods());

export default app;