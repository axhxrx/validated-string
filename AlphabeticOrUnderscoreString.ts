import { ValidatedString, type ValidatedStringFactory } from './ValidatedString.ts';

const isAlphabeticOrUnderscore = (s: string): boolean => /^[a-zA-Z_]+$/.test(s);

/**
 Why JSRCompatibleFactory? See https://github.com/axhxrx/validated-string/issues/1 — consumers of this lib probably don't need to deal with this
 */
const JSRCompatibleFactory = ValidatedString.create(isAlphabeticOrUnderscore, {
  name: 'AlphabeticOrUnderscoreString',
  description: 'must contain only letters (A-Z, a-z) or underscores',
});

const type: ValidatedString<typeof isAlphabeticOrUnderscore> = JSRCompatibleFactory.type;
const factory: ValidatedStringFactory<typeof isAlphabeticOrUnderscore> = JSRCompatibleFactory.factory;

/**
 A string that contains only characters `[a-zA-Z_]` (letters or underscores).
 */
export type AlphabeticOrUnderscoreString = typeof type;
export const AlphabeticOrUnderscoreString = factory;
