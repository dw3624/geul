import { createRoute } from 'honox/factory';
import { AuthorForm } from '../../islands/author-form';
import { BookForm } from '../../islands/book-form';

export default createRoute((c) => {
  return c.render(
    <div>
      <AuthorForm />
      <BookForm />
    </div>
  );
});
