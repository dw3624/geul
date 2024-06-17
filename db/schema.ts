import { sql } from 'drizzle-orm';
import { integer, text, sqliteTable, index } from 'drizzle-orm/sqlite-core';

export const author = sqliteTable('author', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').default('작자 미상'),
  initial: text('initial'),
  birth: text('birth'),
  death: text('death'),
});

export const book = sqliteTable(
  'book',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    title: text('title'),
    initial: text('initial'),
    authorId: integer('author_id').references(() => author.id),
    translator: text('translator'),
    country: text('country'),
    genre: text('genre', { enum: ['소설', '수필', '시', '기타'] }),
    pub: text('pub'),
    pubAt: text('pub_at'),
    detail: text('detail'),
    views: integer('views').default(0),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(
      sql`(unixepoch())`
    ),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
      sql`(unixepoch())`
    ),
  },
  (table) => {
    return {
      authorIdx: index('author_id_idx').on(table.authorId),
    };
  }
);
