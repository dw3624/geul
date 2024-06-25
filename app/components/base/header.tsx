import { createRoute } from 'honox/factory';

export const Header = () => {
  return (
    <header>
      <div class="flex items-center justify-between h-12 px-4">
        <a
          href="/"
          class="inline-flex items-center justify-center font-bold font-serif"
        >
          書<span class="text-sm ml-2">[글 서]</span>
        </a>
      </div>
    </header>
  );
};
