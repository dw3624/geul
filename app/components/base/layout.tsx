import type { Child, ReactNode } from 'hono/jsx';
import { Header } from './header';

export const Layout = ({ children }: { children: Child }) => {
  return (
    <div class="font-sans">
      <Header />
      <main class="max-w-xl mx-auto px-10">{children}</main>
    </div>
  );
};
