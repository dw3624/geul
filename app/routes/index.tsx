import { createRoute } from 'honox/factory';
import { CHAR_LIST } from '../lib/const';

export default createRoute((c) => {
  return c.render(
    <div class="grid grid-cols-1 gap-6 mt-6 py-8 lg:py-10 font-serif">
      <article>
        <h2 class="text-xl font-semibold">작품 찾기</h2>
        <div class="flex flex-col gap-12 mt-6">
          <section>
            <h3 class="font-semibold font-sans">저자</h3>
            <div>
              <div class="inline-grid grid-cols-7 text-xl mt-4 gap-y-2 py-2">
                {CHAR_LIST.map((char) => (
                  <a
                    href={`/authors?initial=${char}`}
                    key={char}
                    class="inline-flex justify-center items-center py-2 px-4 font-semibold hover:underline"
                  >
                    {char}
                  </a>
                ))}
              </div>
              <div class="flex mt-4 gap-4 px-4">
                <a href="/authors" class={' hover:underline'}>
                  전체
                </a>
                <a href="/authors?initial=etc" class={'hover:underline'}>
                  기타
                </a>
              </div>
            </div>
          </section>
          <section>
            <h3 class="font-semibold font-sans">저서</h3>
            <div>
              <div class="inline-grid grid-cols-7 text-xl mt-4 gap-y-2 py-2">
                {CHAR_LIST.map((char) => (
                  <a
                    href={`/books?initial=${char}`}
                    key={char}
                    class="inline-flex justify-center items-center py-2 px-4 font-semibold hover:underline"
                  >
                    {char}
                  </a>
                ))}
              </div>
              <div class="flex mt-4 gap-4 px-4">
                <a href={'/books'} class={' hover:underline'}>
                  전체
                </a>
                <a href={'/books?initial=etc'} class=" hover:underline">
                  기타
                </a>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
});
