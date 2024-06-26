import { Style } from 'hono/css';
import { jsxRenderer } from 'hono/jsx-renderer';
import { Link, Script } from 'honox/server';
import { Layout } from '../components/base/layout';

export default jsxRenderer(({ children, title }) => {
  return (
    <html lang="ko">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <Script src="/app/client.ts" async />
        <Link href="/app/style.css" rel="stylesheet" />
        <Style />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
});
