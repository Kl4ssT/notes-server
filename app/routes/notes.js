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

    ctx.body = note;
});

router.post('/', authMiddleware, async (ctx) => {
    const { title, text, favourites } = ctx.request.body;

    if (!title) ctx.throw(401, JSON.stringify({ message: 'Обязательное поле', field: 'title' }));
    if (!text) ctx.throw(401, JSON.stringify({ message: 'Обязательное поле', field: 'text' }));

    const newNote = await ctx.state.user.createNote({ title, text, favourites: favourites || false, uuid: uuid() });

    if (!newNote) ctx.throw(500, JSON.stringify({ message: 'Ошибка добавления', field: null }));

    ctx.body = newNote;
});

router.put('/:id', authMiddleware, async (ctx) => {
    const { id } = ctx.params;

    if (!id) ctx.throw(401, 'Ошибка запроса');

    const { title, text, favourites } = ctx.request.body;

    if (!title) ctx.throw(401, JSON.stringify({ message: 'Обязательное поле', field: 'title' }));
    if (!text) ctx.throw(401, JSON.stringify({ message: 'Обязательное поле', field: 'text' }));

    const updatedNote = await ctx.state.user.updateNote(
        { title, text, favourites: favourites || false },
        { where:
                { id: Number(id) }
        });

    if (!updatedNote) ctx.throw(500, JSON.stringify({ message: 'Ошибка изменения', field: null }));

    ctx.status = 200;
});

router.del('/:id', authMiddleware, async (ctx) => {
    const { id } = ctx.params;

    if (!id) ctx.throw(400, 'Ошибка запроса');

    if(await ctx.state.user.destroyNote({ where: { id: Number(id) } }))
    {
        ctx.status = 200;
    }
    else
    {
        ctx.throw(400, 'Ошибка удаления');
    }

});

export default router;