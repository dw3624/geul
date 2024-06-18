import { createRoute } from 'honox/factory';
import { findBookById, findContent, updateBookById } from '../../../db';
import { marked } from 'marked';

export default createRoute(async (c) => {
  const { id } = c.req.param();
  const { book, author } = await findBookById(c.env.D1, +id);
  const path = `${author?.name}_${book.title?.replaceAll(' ', '')}`;
  const content = (await findContent(c.env.R2, path)) || '';
  const html = await marked(content, { breaks: true });
  const view = await updateBookById(c.env.D1, +id);

  return c.render(
    <section class="py-10 lg:py-10 space-y-12">
      <header class="text-center font-serif">
        <div class="text-3xl font-bold leading-9">{book.title}</div>
        <div class="mt-8 text-lg font-semibold">
          {author?.name || '작자 미상'}
        </div>
      </header>
      <div class="pt-8 pb-80">
        <article
          id="prose"
          class="prose"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </section>
  );
});
