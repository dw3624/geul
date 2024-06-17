import { createRoute } from 'honox/factory';
import { findBookById, findContent } from '../../../db';

export default createRoute(async (c) => {
  const { id } = c.req.param();
  const { book } = await findBookById(c.env.D1, +id);
  const path = `${book.title}.md`;
  const content = await findContent(c.env.R2, path);
  console.log(content);

  return c.render(<section class="py-8 lg:py-10">{book.title}</section>);
});
