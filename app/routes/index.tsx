import { createRoute } from 'honox/factory';
import { CHAR_LIST } from '../lib/const';

export default createRoute((c) => {
  return c.render(
    <div class="grid grid-cols-1 gap-6 py-6 font-serif">
      <article>
        <h1 class="text-2xl font-bold font-serif">작품 찾기</h1>
        <div class="flex flex-col gap-20 mt-8">
          <section>
            <h3 class="font-semibold font-sans">저자</h3>
            <div>
              <div class="grid grid-cols-7 text-lg gap-y-2 py-2">
                {CHAR_LIST.map((char) => (
                  <a
                    href={`/authors?initial=${char}`}
                    key={char}
                    class="inline-flex justify-center items-center py-2 px-4 font-semibold hover:underline underline-offset-4"
                  >
                    {char}
                  </a>
                ))}
              </div>
              <div class="flex mt-4 gap-6 px-4 font-semibold">
                <a href="/authors" class="hover:underline underline-offset-4">
                  전체
                </a>
                <a
                  href="/authors?initial=etc"
                  class="hover:underline underline-offset-4"
                >
                  기타
                </a>
              </div>
            </div>
          </section>
          <section>
            <h3 class="font-semibold font-sans">저서</h3>
            <div>
              <div class="grid grid-cols-7 text-lg gap-y-2 py-2">
                {CHAR_LIST.map((char) => (
                  <a
                    href={`/books?initial=${char}`}
                    key={char}
                    class="inline-flex justify-center items-center py-2 px-4 font-semibold hover:underline underline-offset-4"
                  >
                    {char}
                  </a>
                ))}
              </div>
              <div class="flex mt-4 gap-6 px-4 font-semibold">
                <a href="/books" class="hover:underline underline-offset-4">
                  전체
                </a>
                <a
                  href="/books?initial=etc"
                  class="hover:underline underline-offset-4"
                >
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
