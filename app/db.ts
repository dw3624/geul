import { drizzle } from 'drizzle-orm/d1';
import { author } from '../schema';
import { eq } from 'drizzle-orm';

export type Book = {
  id: number;
  title: string;
  initial: string;
  authorId: number;
  translator: string;
  country: string;
  genre: string;
  pub: string;
  pubAt: Date;
  detail: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Author = {
  id: number;
  name: string;
  initial: string;
  birth: Date;
  death: Date;
};

export const getBooks = async (d1: D1Database) => {
  const { results } = await d1.prepare('select * from book').all();
  const books = results;
  return books;
};

export const getBookById = async (d1: D1Database, id: number) => {
  const { results } = await d1
    .prepare(`select * from book where id = ${id}`)
    .all();
  const books = results;
  return books;
};

export const getAuthors = async (
  d1: D1Database,
  initial?: string,
  sort?: string
) => {
  // const db = drizzle(d1);
  // const result = await db.select().from(author).all();
  // console.log(result);
  // return result;
  // let query = 'select * from author';
  // const params: (string | undefined)[] = [];

  // if (initial) {
  //   query += ' WHERE initial = ?';
  //   params.push(initial);
  // }

  // const allowedSortColumns = ['name', 'initial', 'birth', 'death'];
  // if (sort && allowedSortColumns.includes(sort)) {
  //   query += `ORDER BY ${sort}`;
  // }

  // const { results } = await d1
  //   .prepare(query)
  //   .bind(...params)
  //   .all<Author>();
  // return results;

  const { results } = await d1.prepare('select * from author').all<Author>();
  return results;
};

export const getAuthorById = async (d1: D1Database, id: number) => {
  const db = drizzle(d1);
  const result = await db.select().from(author).where(eq(author.id, id));
  // const result = await d1
  //   .prepare('select * from author where id = ?')
  //   .bind(id)
  //   .first<Author>();
  console.log(result);
  return result;
};
