export interface User {
  id: string;
  name?: string;
  avatar?: string;
  email?: string;
  settings: {
    returnUrl: string,
    credit: number
  };
  [key: string]: unknown;
}
