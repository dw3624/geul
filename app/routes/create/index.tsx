import { createRoute } from 'honox/factory';
import { AuthorForm } from '../../islands/author-form';
import { BookForm } from '../../islands/book-form';

export default createRoute((c) => {
  return c.render(
    <section class="py-8 lg:py-10">
      <h2 class="text-xl font-bold">서적 업로드</h2>
      <div class="mt-6 space-y-4">
        <AuthorForm />
        <BookForm />
      </div>
    </section>
  );
});
