import { ValidatedString } from './ValidatedString.ts';

const isAwesome = (s: string): boolean => s === 'awesome';

const JSRCompatibleFactory = ValidatedString.create(isAwesome);

export type AwesomeString = typeof JSRCompatibleFactory.type;
export const AwesomeString = JSRCompatibleFactory.factory;

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
