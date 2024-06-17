import { drizzle } from 'drizzle-orm/d1';
import { eq, like, sql } from 'drizzle-orm';
import { author, book } from '../db/schema';
import type { CreateAuthor, CreateBook } from './global';

export const createAuthor = async (d1: D1Database, newAuthor: CreateAuthor) => {
  const db = drizzle(d1);
  const result = await db.insert(author).values(newAuthor).returning();
  return result;
};

export const findAllAuthors = async (d1: D1Database, initial?: string) => {
  const db = drizzle(d1);
  const result = await db
    .select({
      author: author,
      bookCount: sql<number>`count(${book.id})`.as('bookCount'),
    })
    .from(author)
    .where(initial ? eq(author.initial, initial) : undefined);
  return result;
};

export const findAuthorByName = async (d1: D1Database, name: string) => {
  const db = drizzle(d1);
  const authors = await db
    .select()
    .from(author)
    .where(like(author.name, `%${name}%`));
  return authors;
};

export const findAuthorById = async (d1: D1Database, id: number) => {
  const db = drizzle(d1);
  const authors = await db.select().from(author).where(eq(author.id, +id));
  return authors[0];
};

export const createBook = async (d1: D1Database, newBook: CreateBook) => {
  const db = drizzle(d1);
  const result = await db.insert(book).values(newBook).returning();
  return result;
};

export const createBookContent = async (
  r2: R2Bucket,
  path: string,
  content: File
) => {
  const result = await r2.put(path, content, {
    httpMetadata: {
      contentType: 'text/markdown',
    },
  });
  return result.key;
};

export const findAllBooks = async (d1: D1Database, initial?: string) => {
  const db = drizzle(d1);
  const result = await db
    .select({
      book: book,
      author: author.name,
    })
    .from(book)
    .leftJoin(author, eq(author.id, book.authorId))
    .where(initial ? eq(book.initial, initial) : undefined);
  return result;
};

export const findAllBooksByAuthorId = async (d1: D1Database, id: number) => {
  const db = drizzle(d1);
  const books = await db
    .select()
    .from(book)
    .where(id ? eq(book.authorId, id) : undefined);
  return books;
};

export const findBookById = async (d1: D1Database, id: number) => {
  const db = drizzle(d1);
  const result = await db
    .select({
      book: book,
      author: author,
    })
    .from(book)
    .where(eq(book.id, +id))
    .leftJoin(author, eq(book.authorId, author.id));
  return result[0];
};

export const findContent = async (r2: R2Bucket, path: string) => {
  const object = await r2.get(path);
  if (!object) {
    return null;
  }
  const content = await object.text();
  return content;
};
