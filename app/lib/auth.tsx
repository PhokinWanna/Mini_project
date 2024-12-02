import crypto from 'crypto';

export const hashPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

export const verifyPassword = (inputPassword: string, hashedPassword: string): boolean => {
  return hashPassword(inputPassword) === hashedPassword;
};