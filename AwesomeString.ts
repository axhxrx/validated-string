import { ValidatedString, type ValidatedStringFactory } from './ValidatedString.ts';

const isAwesome = (s: string): boolean => s === 'awesome';

/**
 Why JSRCompatibleFactory? See https://github.com/axhxrx/validated-string/issues/1 — consumers of this lib probably don't need to deal with this
 */
const JSRCompatibleFactory = ValidatedString.create(isAwesome);

const type: ValidatedString<typeof isAwesome> = JSRCompatibleFactory.type;
const factory: ValidatedStringFactory<typeof isAwesome> = JSRCompatibleFactory.factory;

export type AwesomeString = typeof type;
export const AwesomeString = factory;

// Usage:
const x = AwesomeString.try('awesome'); // AwesomeString | undefined
const y: AwesomeString = AwesomeString.assert('awesome'); // AwesomeString

// If invalid:
const z = AwesomeString.try('not awesome'); // undefined

console.log('x is ', x);
console.log('y is ', y);
console.log('z is ', z);

try
{
  const ohno = AwesomeString.assert('not awesome');
  console.log('ohno is ', ohno);
}
catch (error)
{
  console.log('Got error as expected:', error);
}
