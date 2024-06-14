import {} from 'hono';

type Head = {
  title?: string;
};

declare module 'hono' {
  interface Env {
    Variables: {};
    Bindings: {
      D1: D1Database;
      R2: R2Bucket;
    };
  }
  interface ContextRenderer {
    (content: string | Promise<string>, head?: Head):
      | Response
      | Promise<Response>;
  }
}
