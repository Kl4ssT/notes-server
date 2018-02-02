import Router from 'koa-router';
import authMiddleware from "../middlewares/auth";
import models from "../db";
import bcrypt from 'bcrypt';
import { getToken } from '../utils/jwt';

const router = new Router({ prefix: '/auth' });

router.post('/login', async (ctx) => {
    const { login, password } = ctx.request.body;

    if (!login || !password) ctx.throw(400, 'Invalid data');

    const user = await models.Users.findOne({ where: { login } });

    if (!user) ctx.throw(404, 'User not found');

    if (!bcrypt.compareSync(password, user.password)) ctx.throw(401, 'Invalid data');

    ctx.body = await getToken(login);
});

router.post('/register', async (ctx) => {
    const { login, password } = ctx.request.body;

    if (!login || !password) ctx.throw(400, 'Invalid data');

    const user = await models.Users.findOne({ where: { login } });

    if (user) ctx.throw(400, 'User is exist');

    await models.Users.create({ login, password });

    ctx.body = {
        login,
        password
    };
});

export default router;