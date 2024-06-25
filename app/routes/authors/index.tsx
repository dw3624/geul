import { createRoute } from 'honox/factory';
import { findAllAuthors } from '../../db';

export default createRoute(async (c) => {
  const initial = c.req.query('initial');
  const data = await findAllAuthors(c.env.D1, initial);

  return c.render(
    <section class="py-8 lg:py-10">
      <h1 class="text-4xl font-bold font-serif">
        {initial ? initial : '전체'}
      </h1>
      <article class="py-6 mt-4">
        {data ? (
          <>
            <div class="flex items-center justify-end text-sm text-muted-foreground">
              <span>저서</span>
            </div>
            <div class="flex flex-col gap-6 mt-4">
              {data.map((item) => (
                <div
                  key={item.author.id}
                  class="flex items-baseline justify-between font-serif"
                >
                  <div>
                    <a href={`/authors/${item.author.id}`}>
                      {item.author.name}
                    </a>
                  </div>
                  <div>{item.bookCount}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>등록된 저자가 없습니다.</div>
        )}
      </article>
    </section>
  );
});
