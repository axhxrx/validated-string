import { ValidatedString, type ValidatedStringFactory } from './ValidatedString.ts';
const isAlphabeticOrUnderscoreOrHyphen = (s: string): boolean => /^[a-zA-Z_-]+$/.test(s);

/**
 Why JSRCompatibleFactory? See https://github.com/axhxrx/validated-string/issues/1 — consumers of this lib probably don't need to deal with this
 */
const JSRCompatibleFactory = ValidatedString.create(
  isAlphabeticOrUnderscoreOrHyphen,
  {
    name: 'AlphabeticOrUnderscoreOrHyphenString',
    description: 'must contain only letters (A-Z, a-z), underscores, or hyphens',
  },
);

const type: ValidatedString<typeof isAlphabeticOrUnderscoreOrHyphen> = JSRCompatibleFactory.type;
const factory: ValidatedStringFactory<typeof isAlphabeticOrUnderscoreOrHyphen> = JSRCompatibleFactory.factory;

export type AlphabeticOrUnderscoreOrHyphenString = typeof type;
export const AlphabeticOrUnderscoreOrHyphenString = factory;
