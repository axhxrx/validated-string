import { ValidatedString, type ValidatedStringFactory } from './ValidatedString.ts';

const isAlphabetic = (s: string): boolean => /^[a-zA-Z]+$/.test(s);

/**
 Why JSRCompatibleFactory? See https://github.com/axhxrx/validated-string/issues/1 — consumers of this lib probably don't need to deal with this
 */
const JSRCompatibleFactory = ValidatedString.create(isAlphabetic, {
  name: 'AlphabeticString',
  description: 'must contain only letters (A-Z, a-z)',
});

const type: ValidatedString<typeof isAlphabetic> = JSRCompatibleFactory.type;
const factory: ValidatedStringFactory<typeof isAlphabetic> = JSRCompatibleFactory.factory;


/**
 A string that contains only letters `[a-zA-Z]`.
 */
export type AlphabeticString = typeof type;
export const AlphabeticString = factory;
