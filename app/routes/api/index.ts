import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { author, book } from '../../../db/schema';
import { eq, ilike, or } from 'drizzle-orm';
import {
  createAuthor,
  createBook,
  createBookContent,
  findAuthorByName,
} from '../../db';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { getInitialConsonant } from '../../lib/lib';

const app = new Hono();

const authorSchema = z.object({
  name: z.string(),
  birth: z.string(),
  death: z.string(),
});

app.post('/authors', zValidator('form', authorSchema), async (c) => {
  const validated = c.req.valid('form');
  const newAuthor = {
    ...validated,
    initial: getInitialConsonant(validated.name),
  };
  await createAuthor(c.env.D1, newAuthor);
  return c.redirect('/');
});

// app.get('/authors', async (c) => {
//   const initial = c.req.query('initial');
//   const db = drizzle(c.env.D1);
//   const result = await db
//     .select()
//     .from(author)
//     .where(initial ? eq(author.initial, initial) : undefined);
//   return c.json({
//     length: result.length,
//     data: result,
//   });
// });

app.get('/authors/name-search/:name', async (c) => {
  const name = c.req.param('name');
  const result = await findAuthorByName(c.env.D1, name);
  console.log(result);
  return c.json({
    length: result.length,
    data: result,
  });
});

// app.get('/authors/:id', async (c) => {
//   const id = c.req.param('id');
//   const db = drizzle(c.env.D1);
//   const result = await db
//     .select()
//     .from(author)
//     .where(eq(author.id, +id))
//     .leftJoin(book, eq(book.authorId, author.id));
//   return c.json({ data: result[0] });
// });

export const bookSchema = z.object({
  title: z.string(),
  author: z.string(),
  authorId: z.coerce.number(),
  translator: z.string(),
  country: z.string(),
  genre: z.enum(['소설', '수필', '시', '기타']),
  pubAt: z.string(),
  pub: z.string(),
  detail: z.string().optional(),
  content: z.any(),
});

app.post('/books', zValidator('form', bookSchema), async (c) => {
  const validated = c.req.valid('form');
  console.log(validated);
  const newBook = {
    title: validated.title,
    initial: getInitialConsonant(validated.title),
    authorId: +validated.authorId,
    translator: validated.translator,
    country: validated.country,
    genre: validated.genre,
    pub: validated.pub,
    pubAt: validated.pubAt,
    detail: validated.detail,
  };
  await createBook(c.env.D1, newBook);

  const authorPath = validated.author.replaceAll(' ', '');
  const titlePath = validated.title.replaceAll(' ', '');
  const path = `${authorPath}_${titlePath}`;
  console.log(path);
  await createBookContent(c.env.R2, path, validated.content);
  return c.redirect('/');
});

// app.get('/books', async (c) => {
//   const initial = c.req.query('initial');
//   const db = drizzle(c.env.D1);
//   const result = await db
//     .select()
//     .from(book)
//     .where(initial ? eq(book.initial, initial) : undefined);
//   return c.json({ data: result });
// });

// app.get('/books/:id', async (c) => {
//   const id = c.req.param('id');
//   const db = drizzle(c.env.D1);
//   const result = await db
//     .select()
//     .from(book)
//     .where(eq(book.id, +id))
//     .leftJoin(author, eq(book.authorId, author.id));
//   return c.json({ data: result[0] });
// });

// app.get('/books/:id/content', async (c) => {
//   const id = c.req.param('id');
//   const db = drizzle(c.env.D1);
//   const bucket = c.env.R2;
//   const keyInfo = await db
//     .select({
//       title: book.title,
//       author: author.name,
//     })
//     .from(book)
//     .where(eq(book.id, +id))
//     .leftJoin(author, eq(book.authorId, author.id));

//   if (keyInfo.length === 0) {
//     return c.json({ error: 'Book not found' }, 404);
//   }

//   const path = `${keyInfo[0].author}_${keyInfo[0].title}.md`;
//   const object = await bucket.get(path);

//   if (!object) {
//     return c.json({ error: 'Content not found' }, 404);
//   }

//   const content = await object.text();

//   return c.json({
//     data: { title: keyInfo[0].title, author: keyInfo[0].author, content },
//   });
// });

// app.get('/search/author', async (c) => {
//   const keyword = c.req.query('keyword');
//   const db = drizzle(c.env.D1);
//   if (!keyword) {
//     return;
//   }
//   const result = await db
//     .select()
//     .from(author)
//     .where(ilike(author.name, keyword));

//   return c.json({ data: result });
// });

export default app;
