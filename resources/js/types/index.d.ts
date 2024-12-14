export type AuthData = {
  user: UserData;
};
export type FlashMessageData = {
  type: string;
  message: string;
};
export type LinksData = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};
export type MetaData = {
  current_page: number;
  from: number;
  last_page: number;
  path: number;
  per_page: number;
  to: number;
  total: number;
  links: Array<LinksData>;
};
export type MetaLinksData = {
  url: string | null;
  label: string;
  active: boolean;
};
export type PagePropsData = {
  auth: AuthData;
  flashMessage: FlashMessageData;
};
export type UserData = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};
export type UserPaginatedData = {
  data: Array<UserData>;
  links: LinksData;
  meta: MetaData;
};
