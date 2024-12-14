import { ValidatedString } from './ValidatedString.ts';

const isAlphabeticOrUnderscore = (s: string): boolean => /^[a-zA-Z_]+$/.test(s);

const JSRCompatibleFactory = ValidatedString.create(isAlphabeticOrUnderscore, {
  name: 'AlphabeticOrUnderscoreString',
  description: 'must contain only letters (A-Z, a-z) or underscores',
});

export type AlphabeticOrUnderscoreString = typeof JSRCompatibleFactory.type;
export const AlphabeticOrUnderscoreString = JSRCompatibleFactory.factory;
