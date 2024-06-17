import { createRoute } from 'honox/factory';

export const Header = () => {
  return (
    <header>
      <div class="flex items-center justify-between h-14 px-4">
        <div class="font-bold font-serif">
          書<span class="text-sm ml-2">[글 서]</span>
        </div>
      </div>
    </header>
  );
};
