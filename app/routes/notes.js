import Router from 'koa-router';
import authMiddleware from "../middlewares/auth";

const router = new Router({ prefix: '/notes' });

router.get('/', authMiddleware, async (ctx) => {
    ctx.body = await ctx.state.user.getNotes();
});

export default router;