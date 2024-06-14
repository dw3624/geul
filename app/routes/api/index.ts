import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { author, book } from '../../../db/schema';
import { eq, ilike, or } from 'drizzle-orm';

const app = new Hono();

app.get('/authors', async (c) => {
  const initial = c.req.query('initial');
  const db = drizzle(c.env.D1);
  const result = await db
    .select()
    .from(author)
    .where(initial ? eq(author.initial, initial) : undefined);
  return c.json({
    length: result.length,
    data: result,
  });
});

app.get('/authors/:id', async (c) => {
  const id = c.req.param('id');
  const db = drizzle(c.env.D1);
  const result = await db
    .select()
    .from(author)
    .where(eq(author.id, +id))
    .leftJoin(book, eq(book.authorId, author.id));
  return c.json({ data: result[0] });
});

app.post('/books', async (c) => {
  const body = await c.req.formData();
  const db = drizzle(c.env.D1);

  return;
});

app.get('/books', async (c) => {
  const initial = c.req.query('initial');
  const db = drizzle(c.env.D1);
  const result = await db
    .select()
    .from(book)
    .where(initial ? eq(book.initial, initial) : undefined);
  return c.json({ data: result });
});

app.get('/books/:id', async (c) => {
  const id = c.req.param('id');
  const db = drizzle(c.env.D1);
  const result = await db
    .select()
    .from(book)
    .where(eq(book.id, +id))
    .leftJoin(author, eq(book.authorId, author.id));
  return c.json({ data: result[0] });
});

app.get('/books/:id/content', async (c) => {
  const id = c.req.param('id');
  const db = drizzle(c.env.D1);
  const bucket = c.env.R2;
  const keyInfo = await db
    .select({
      title: book.title,
      author: author.name,
    })
    .from(book)
    .where(eq(book.id, +id))
    .leftJoin(author, eq(book.authorId, author.id));

  if (keyInfo.length === 0) {
    return c.json({ error: 'Book not found' }, 404);
  }

  const path = `${keyInfo[0].author}_${keyInfo[0].title}.md`;
  const object = await bucket.get(path);

  if (!object) {
    return c.json({ error: 'Content not found' }, 404);
  }

  const content = await object.text();

  return c.json({
    data: { title: keyInfo[0].title, author: keyInfo[0].author, content },
  });
});

app.get('/search/author', async (c) => {
  const keyword = c.req.query('keyword');
  const db = drizzle(c.env.D1);
  if (!keyword) {
    return;
  }
  const result = await db
    .select()
    .from(author)
    .where(ilike(author.name, keyword));

  return c.json({ data: result });
});

export default app;
