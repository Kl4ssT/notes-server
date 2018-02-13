import Router from 'koa-router';
import authMiddleware from "../middlewares/auth";
import uuid from 'uuid/v1';

const router = new Router({ prefix: '/notes' });

router.get('/', authMiddleware, async (ctx) => {
    ctx.body = await ctx.state.user.getNotes();
});

router.get('/:id', authMiddleware, async (ctx) => {
   const { id } = ctx.params;

   if (!id) ctx.throw(401, 'Ошибка запроса');

    const note = await ctx.state.user.getNote({ where: { id: Number(id) } });

    if (!note) ctx.throw(404, { message: 'Заметка не найдена' });
});

router.post('/', authMiddleware, async (ctx) => {
    const { title, text, favourites } = ctx.request.body;

    if (!title) ctx.throw(401, JSON.stringify({ message: 'Обязательное поле', field: 'title' }));
    if (!text) ctx.throw(401, JSON.stringify({ message: 'Обязательное поле', field: 'text' }));

    const newNote = await ctx.state.user.createNote({ title, text, favourites: favourites || false, uuid: uuid() });

    if (!newNote) ctx.throw(500, JSON.stringify({ message: 'Ошибка добавления', field: null }));

    ctx.body = newNote;
});

export default router;