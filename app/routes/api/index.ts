import { Hono } from 'hono';
import {
  createAuthor,
  createBook,
  createBookContent,
  findAuthorByName,
} from '../../db';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { getInitialConsonant } from '../../lib/utils';

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

app.get('/authors/name-search/:name', async (c) => {
  const name = c.req.param('name');
  const result = await findAuthorByName(c.env.D1, name);
  console.log(result);
  return c.json({
    length: result.length,
    data: result,
  });
});

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

export default app;
