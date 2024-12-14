import { ValidatedString } from './ValidatedString.ts';

const isAlphabetic = (s: string): boolean => /^[a-zA-Z]+$/.test(s);

const JSRCompatibleFactory = ValidatedString.create(isAlphabetic, {
  name: 'AlphabeticString',
  description: 'must contain only letters (A-Z, a-z)',
});

export type AlphabeticString = typeof JSRCompatibleFactory.type;
export const AlphabeticString = JSRCompatibleFactory.factory;
