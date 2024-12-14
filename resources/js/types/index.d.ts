import { UserData } from './generated';

export type PaginatedData<T> = {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
  };
};

export type PageProps<T = Record<string, unknown>> = T & {
  auth: {
    user: UserData;
  };
  flashMessage: {
    type: string;
    message: string;
  };
};

export * from './generated';
