import { ValidatedString, type ValidatedStringFactory } from './ValidatedString.ts';

const isLowercaseAlpha = (s: string): boolean => /^[a-z]+$/.test(s);

/**
 Why JSRCompatibleFactory? See https://github.com/axhxrx/validated-string/issues/1 — consumers of this lib probably don't need to deal with this
 */
const JSRCompatibleFactory = ValidatedString.create(isLowercaseAlpha, {
  name: 'LowercaseAlphabeticString',
  description: 'must contain only lowercase letters (a-z)',
});

const type: ValidatedString<typeof isLowercaseAlpha> = JSRCompatibleFactory.type;
const factory: ValidatedStringFactory<typeof isLowercaseAlpha> = JSRCompatibleFactory.factory;

export type LowercaseAlphabeticString = typeof type;
export const LowercaseAlphabeticString = factory;
