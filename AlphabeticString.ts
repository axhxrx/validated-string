import { ValidatedString } from './ValidatedString.ts';

const isAlphabetic = (s: string) => /^[a-zA-Z]+$/.test(s);

const { factory, type } = ValidatedString.create(isAlphabetic, {
  name: 'AlphabeticString',
  description: 'must contain only letters (A-Z, a-z)',
});

export type AlphabeticString = typeof type;
export const AlphabeticString = factory;
