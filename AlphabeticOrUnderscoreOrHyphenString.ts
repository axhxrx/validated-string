import { ValidatedString } from './ValidatedString.ts';
const isAlphabeticOrUnderscoreOrHyphen = (s: string) => /^[a-zA-Z_-]+$/.test(s);

const { factory, type } = ValidatedString.create(
  isAlphabeticOrUnderscoreOrHyphen,
  {
    name: 'AlphabeticOrUnderscoreOrHyphenString',
    description: 'must contain only letters (A-Z, a-z), underscores, or hyphens',
  },
);

export type AlphabeticOrUnderscoreOrHyphenString = typeof type;
export const AlphabeticOrUnderscoreOrHyphenString = factory;
