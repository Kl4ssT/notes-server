import convert from 'koa-convert';
import compose from 'koa-compose';

import cors from 'koa-cors';
import body from 'koa-body';
import logger from 'koa-logger';

export default () => {
    const middlewares = [];
    middlewares.push(convert(cors()));
    middlewares.push(convert(body()));
    middlewares.push(convert(logger()));

    return compose(middlewares);
}