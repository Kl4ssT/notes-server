import models from '../db';
import { verifyToken } from '../utils/jwt';

export default async (ctx, next) => {
    const { authorization } = ctx.headers;
    console.log(authorization);

    if (!authorization) ctx.throw(401, 'Unauthorization');

    console.log(await verifyToken(authorization));

    const login = await verifyToken(authorization);

    if (!login) ctx.throw(400, 'Invalid data');

    const user = await models.Users.findOne({ where: { login } });

    if (!user) ctx.throw(404, 'User not found');

    ctx.state.user = user;

    await next();
}