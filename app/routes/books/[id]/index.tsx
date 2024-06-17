import { createRoute } from 'honox/factory';
import { findBookById } from '../../../db';

export default createRoute(async (c) => {
  const { id } = c.req.param();
  const { book, author } = await findBookById(c.env.D1, +id);
  const descriptions = [
    {
      title: '작품 정보',
      contents: [
        { label: '국가', value: book.country },
        { label: '분류', value: book.genre },
        { label: '발행일', value: `${book.pubAt}` },
        { label: '발표지면', value: book.pub },
        { label: '소개', value: book.detail },
        { label: '역자', value: book.translator },
      ],
    },
    {
      title: '저자 정보',
      contents: [
        { label: '저자', value: author?.name },
        { label: '출생', value: author?.birth },
        { label: '사망', value: author?.death },
      ],
    },
  ];

  return c.render(
    <section className="py-8 lg:py-10">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight font-serif">
          {book.title}
        </h1>
        <p className="mt-4">{author?.name}</p>
      </div>

      <div className="flex flex-col gap-16 py-6 mt-12">
        {descriptions.map((desc) => (
          <div key={desc.title}>
            <h2 className="font-semibold">| {desc.title} |</h2>
            <div className="flex flex-col gap-2 mt-4">
              {desc.contents.map(
                (content) =>
                  content.value && (
                    <div key={content.label} className="grid grid-cols-3 gap-2">
                      <div className="col-span-1">{content.label}</div>
                      <div className="col-span-2 break-words">
                        {content.value}
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        ))}
        <div>
          <h2 className="font-semibold">| 작품 열람 및 내려받기 |</h2>
          <div className="flex flex-col gap-2 mt-4">
            <a href={`/books/${book.id}/content`} className="w-[120px] mr-2">
              HTML
            </a>
            <div className="w-[120px] mr-2">텍스트</div>
            <div className="w-[120px] mr-2">마크다운</div>
          </div>
        </div>
      </div>
    </section>
  );
});
