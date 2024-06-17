export const AuthorForm = () => {
  return (
    <div>
      <h2>저자 등록2</h2>
      <div>
        <form method="POST" action="/api/authors">
          <div>
            <label htmlFor="name">이름</label>
            <input id="name" type="text" name="name" />
          </div>
          <div>
            <label htmlFor="birth">출생</label>
            <input id="birth" type="date" name="birth" />
          </div>
          <div>
            <label htmlFor="death">사망</label>
            <input id="death" type="date" name="death" />
          </div>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};
