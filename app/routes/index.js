import Router from 'koa-router';

import notes from './notes';
import auth from './auth';

const rootRouter = new Router();

rootRouter
    .use(auth.routes())
    .use(notes.routes());

export default rootRouter;