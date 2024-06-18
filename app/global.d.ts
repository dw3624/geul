import {} from 'hono';

type Head = {
  title?: string;
};

type CreateAuthor = {
  id?: number;
  name: string;
  initial: string;
  birth?: string;
  death?: string;
};

type CreateBook = {
  id?: number;
  title: string;
  initial: string;
  authorId?: number;
  translator?: string;
  country?: string;
  genre?: '소설' | '수필' | '시' | '기타';
  pub?: string;
  pubAt?: string;
  detail?: string;
};

declare module 'hono' {
  interface Env {
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    Variables: {};
    Bindings: {
      D1: D1Database;
      R2: R2Bucket;
    };
  }
  interface ContextRenderer {
    // biome-ignore lint/style/useShorthandFunctionType: <explanation>
    (content: string | Promise<string>, head?: Head):
      | Response
      | Promise<Response>;
  }
}
