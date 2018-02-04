import Router from 'koa-router';
import models from "../db";
import bcrypt from 'bcrypt';
import { getToken } from '../utils/jwt';

const router = new Router({ prefix: '/auth' });

router.post('/login', async (ctx) => {
    const { login, password } = ctx.request.body;

    if (!login || login === '') ctx.throw(400, JSON.stringify({ message: 'Обязательное поле', field: 'login' }));
    if (!password || password === '') ctx.throw(400, JSON.stringify({ message: 'Обязательное поле', field: 'password' }));

    const user = await models.Users.findOne({ where: { login } });

    if (!user) ctx.throw(404, JSON.stringify({ message: 'Неверный логин', field: 'login' }));

    if (!bcrypt.compareSync(password, user.password)) ctx.throw(400, JSON.stringify({ message: 'Неверный пароль', field: 'password' }));

    ctx.body = await getToken(user.login);
});

router.post('/register', async (ctx) => {
    const { login, password } = ctx.request.body;

    if (!login || login === '') ctx.throw(400, JSON.stringify({ message: 'Обязательное поле', field: 'login' }));
    if (!password || password === '') ctx.throw(400, JSON.stringify({ message: 'Обязательное поле', field: 'password' }));

    const user = await models.Users.findOne({ where: { login } });

    if (user) ctx.throw(400, JSON.stringify({ message: 'Пользователь существует', field: 'login' }));

    const newUser = await models.Users.create({ login, password });

    ctx.body = await getToken(newUser.login);
});

export default router;