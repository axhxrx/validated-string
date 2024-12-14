import { ValidatedString } from './ValidatedString.ts';
const isAlphabeticOrUnderscoreOrHyphen = (s: string) => /^[a-zA-Z_-]+$/.test(s);

// Why JSRCompatibleFactory? See https://github.com/axhxrx/validated-string/issues/1
const JSRCompatibleFactory = ValidatedString.create(
  isAlphabeticOrUnderscoreOrHyphen,
  {
    name: 'AlphabeticOrUnderscoreOrHyphenString',
    description: 'must contain only letters (A-Z, a-z), underscores, or hyphens',
  },
);

const type = JSRCompatibleFactory.type;
const factory = JSRCompatibleFactory.factory;

export type AlphabeticOrUnderscoreOrHyphenString = typeof type;
export const AlphabeticOrUnderscoreOrHyphenString = factory;
