import { useState, type FC } from 'hono/jsx';

type Author = {
  id: number;
  name: string;
  initial?: string;
  birth?: string;
  death?: string;
};

export const BookForm = () => {
  const [authorName, setAuthorName] = useState('');
  const [authorId, setAuthorId] = useState<number>();
  const [authors, setAuthors] = useState<Author[]>([]);

  const handleAuthorSearch = async () => {
    const response = await fetch(`/api/authors/name-search/${authorName}`);
    const result: { length: number; data: Author[] } = await response.json();
    setAuthors(result.data);
  };

  const handleAuthorSelect = (author: Author) => {
    setAuthorId(author.id);
    setAuthorName(author.name);
  };

  return (
    <div>
      <h2 class="font-semibold text-lg">작품 업로드</h2>

      <form
        method="POST"
        action="/api/books"
        encType="multipart/form-data"
        class="mt-4 flex flex-col gap-4"
      >
        <div>
          <label htmlFor="title">제목</label>
          <input id="title" type="text" name="title" class="border ml-4" />
        </div>
        <div>
          <label htmlFor="author">저자</label>
          <input
            id="author"
            type="search"
            name="author"
            value={authorName}
            onChange={(e) =>
              setAuthorName((e.target as HTMLInputElement).value)
            }
            onBlur={handleAuthorSearch}
            required
            class="border ml-4"
          />
          {authors.length > 0 && (
            <ul>
              {authors.map((author) => (
                <li key={author.id} class="cursor-pointer">
                  <button
                    type="button"
                    onClick={() => handleAuthorSelect(author)}
                    class="hover:bg-muted px-2 py-1"
                  >
                    {author.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <input
            type="hidden"
            name="authorId"
            value={authorId}
            class="border ml-4"
          />
        </div>
        <div>
          <label htmlFor="translator">역자</label>
          <input
            id="translator"
            type="text"
            name="translator"
            class="border ml-4"
          />
        </div>
        <div>
          <label htmlFor="country">국가</label>
          <input id="country" type="text" name="country" class="border ml-4" />
        </div>
        <div>
          <label htmlFor="genre">장르</label>
          <select id="genre" name="genre" class="border ml-4">
            <option value="소설">소설</option>
            <option value="수필">수필</option>
            <option value="시">시</option>
            <option value="기타">기타</option>
          </select>
        </div>
        <div>
          <label htmlFor="pubAt">발행일</label>
          <input id="pubAt" type="date" name="pubAt" class="border ml-4" />
        </div>
        <div>
          <label htmlFor="pub">출판사</label>
          <input id="pub" type="text" name="pub" class="border ml-4" />
        </div>
        <div>
          <label htmlFor="detail">소개</label>
          <textarea class="border ml-4" />
        </div>
        <div>
          <label htmlFor="content">본문 업로드</label>
          <input
            id="content"
            type="file"
            name="content"
            accept=".md"
            class="border ml-4"
          />
        </div>
        <button
          type="submit"
          class="bg-primary text-primary-foreground p-2 text-sm hover:pointer"
        >
          제출
        </button>
      </form>
    </div>
  );
};
