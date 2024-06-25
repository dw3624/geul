export const AuthorForm = () => {
  return (
    <div>
      <h2 class="font-semibold text-lg">저자 등록</h2>
      <form
        method="POST"
        action="/api/authors"
        class="mt-4 flex flex-col gap-4"
      >
        <div>
          <label htmlFor="name">이름</label>
          <input id="name" type="text" name="name" class="border ml-4" />
        </div>
        <div>
          <label htmlFor="birth">출생</label>
          <input id="birth" type="date" name="birth" class="border ml-4" />
        </div>
        <div>
          <label htmlFor="death">사망</label>
          <input id="death" type="date" name="death" class="border ml-4" />
        </div>
        <input
          type="submit"
          class="bg-primary text-primary-foreground p-2 text-sm hover:pointer"
        />
      </form>
    </div>
  );
};
