import Router from 'koa-router';

/*import users from './users';*/
import notes from './notes';
import auth from './auth';

const rootRouter = new Router();

rootRouter
    .use(auth.routes())
    .use(notes.routes());

/*rootRouter

    .use(users.routes())
    .use(auth.routes());*/

export default rootRouter;