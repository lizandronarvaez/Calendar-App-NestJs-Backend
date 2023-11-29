import { compareSync } from 'bcrypt';

export const comparePassword = (password: string, passwordHash: string) => {
  return compareSync(password, passwordHash);
};
