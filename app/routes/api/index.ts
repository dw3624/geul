import { Hono } from 'hono';

const app = new Hono();

app.get('/books', (c) => {
  return c.json({
    msg: 'hello',
  });
});

export default app;
