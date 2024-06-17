import { createRoute } from 'honox/factory';
import { findAllAuthors, findAllBooks } from '../../db';

export default createRoute(async (c) => {
  const initial = c.req.query('initial');
  const data = await findAllBooks(c.env.D1, initial);

  return c.render(
    <section class="py-8 lg:py-10">
      <h1 class="text-4xl font-bold font-serif">
        {initial ? initial : '전체'}
      </h1>
      <article class="py-6 mt-12">
        <div class="flex items-center justify-between text-sm text-muted-foreground">
          <span>제목</span>
          <span>열람</span>
        </div>
        <div class="flex flex-col gap-6 mt-4">
          {data.map((item) => (
            <div
              key={item.book.id}
              className="flex items-baseline justify-between"
            >
              <div className="flex items-baseline">
                <div className="font-serif">
                  <a href={`/books/${item.book.id}`}>{item.book.title}</a>
                </div>
                <div className="ml-4 text-sm">
                  <a href={`/authors/${item.book.authorId}`}>{item.author}</a>
                </div>
              </div>
              <div className="font-serif">{item.book.views}</div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
});
