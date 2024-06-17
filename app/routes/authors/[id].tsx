import { createRoute } from 'honox/factory';
import { findAllBooksByAuthorId, findAuthorById } from '../../db';

export default createRoute(async (c) => {
  const { id } = c.req.param();
  const author = await findAuthorById(c.env.D1, +id);
  const books = await findAllBooksByAuthorId(c.env.D1, +id);
  const novels = books.filter((book) => book.genre === '소설');
  const essays = books.filter((book) => book.genre === '수필');
  const poems = books.filter((book) => book.genre === '시');
  const others = books.filter((book) => book.genre === '기타');

  return c.render(
    <section class="py-8 lg:py-10">
      <h1 class="scroll-m-20 text-4xl font-bold tracking-tight font-serif">
        {author.name}
      </h1>
      <div class="flex flex-col gap-16 py-6 mt-12">
        <div>
          <h2 class="font-semibold">| 기본 정보 |</h2>
          <div class="flex flex-col gap-2 mt-4">
            <div class="flex">
              <div class="w-[120px] mr-2">출생</div>
              <div class="col-span-auto">{author.birth}</div>
            </div>
            <div class="flex">
              <div class="w-[120px] mr-2">사망</div>
              <div>{author.death}</div>
            </div>
          </div>
        </div>
        <div class="">
          <h2 class="font-semibold">| 작품 목록 |</h2>
          <div class="flex flex-col gap-12 mt-4">
            {novels.length > 0 && (
              <div>
                <h3 class="text-sm font-semibold">소설 · {novels.length}</h3>
                <div class="flex flex-col gap-2 mt-4 font-serif">
                  {novels.map((novel) => (
                    <a href={`/books/${novel.id}`} key={novel.id}>
                      {novel.title} ({novel.pubAt})
                    </a>
                  ))}
                </div>
              </div>
            )}
            {essays.length > 0 && (
              <div>
                <h3 class="text-sm font-semibold">수필 · {essays.length}</h3>
                <div class="flex flex-col gap-2 mt-4 font-serif">
                  {essays.map((essay) => (
                    <div key={essay.id}>
                      {essay.title} ({essay.pubAt})
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});
