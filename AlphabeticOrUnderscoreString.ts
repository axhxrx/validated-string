import { ValidatedString } from './ValidatedString.ts';

const isAlphabeticOrUnderscore = (s: string) => /^[a-zA-Z_]+$/.test(s);

const { factory, type } = ValidatedString.create(isAlphabeticOrUnderscore, {
  name: 'AlphabeticOrUnderscoreString',
  description: 'must contain only letters (A-Z, a-z) or underscores',
});

export type AlphabeticOrUnderscoreString = typeof type;
export const AlphabeticOrUnderscoreString = factory;
