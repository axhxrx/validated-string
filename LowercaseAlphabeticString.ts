import { ValidatedString } from './ValidatedString.ts';

const isLowercaseAlpha = (s: string): boolean => /^[a-z]+$/.test(s);

const { factory, type } = ValidatedString.create(isLowercaseAlpha, {
  name: 'LowercaseAlphabeticString',
  description: 'must contain only lowercase letters a-z',
});

export type LowercaseAlphabeticString = typeof type;
export const LowercaseAlphabeticString = factory;
