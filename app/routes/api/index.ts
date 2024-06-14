import { Hono } from 'hono';
import { getAuthorById, getAuthors, getBookById, getBooks } from '../../db';
import { drizzle } from 'drizzle-orm/d1';
import { author, book } from '../../../schema';

const app = new Hono();

app.post('/books', async (c) => {
  return;
});

app.get('/books', async (c) => {
  const db = drizzle(c.env.D1);
  const result = await db.select().from(book).all();
  console.log(result);
  return c.json({ data: result });
});

app.get('/books/:id', async (c) => {
  const id = c.req.param('id');
  const book = await getBookById(c.env.D1, +id);
  return c.json({
    book,
  });
});

app.get('/books/:id/content', async (c) => {
  const id = c.req.param('id');
  return c.json({
    msg: 'hello',
  });
});

app.get('/authors', async (c) => {
  const initial = c.req.query('initial');
  const authors = await getAuthors(c.env.D1, initial);
  return c.json({
    length: authors.length,
    data: authors,
  });
});

app.get('/authors/:id', async (c) => {
  const id = c.req.param('id');
  const author = await getAuthorById(c.env.D1, +id);
  return c.json({
    data: author,
  });
});

export default app;
