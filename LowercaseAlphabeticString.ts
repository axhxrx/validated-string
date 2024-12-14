import { ValidatedString } from './ValidatedString.ts';

const isLowercaseAlpha = (s: string): boolean => /^[a-z]+$/.test(s);

const JSRCompatibleFactory = ValidatedString.create(isLowercaseAlpha, {
  name: 'LowercaseAlphabeticString',
  description: 'must contain only lowercase letters (a-z)',
});

export type LowercaseAlphabeticString = typeof JSRCompatibleFactory.type;
export const LowercaseAlphabeticString = JSRCompatibleFactory.factory;
