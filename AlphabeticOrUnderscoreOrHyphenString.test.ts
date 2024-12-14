import { assertEquals, assertThrows } from '@std/assert';
import { AlphabeticOrUnderscoreOrHyphenString } from './AlphabeticOrUnderscoreOrHyphenString.ts';

Deno.test('AlphabeticOrUnderscoreOrHyphenString - validates letters, underscores, and hyphens', () =>
{
  const validInputs = [
    'Hello',
    'WORLD',
    'snake_case',
    'kebab-case',
    'mixed_snake-kebab',
    'SCREAMING_SNAKE-KEBAB',
    'abc',
    'ABC',
    '_leading',
    '-leading',
    'trailing_',
    'trailing-',
    '_',
    '-',
    '__double__underscore__',
    '--double--hyphen--',
  ];

  for (const input of validInputs)
  {
    const result = AlphabeticOrUnderscoreOrHyphenString.try(input);
    assertEquals(result, input);
  }
});

Deno.test('AlphabeticOrUnderscoreOrHyphenString - rejects invalid inputs', () =>
{
  const invalidInputs = [
    'Hello123', // numbers
    'Hello!', // special characters
    'Hello World', // spaces
    '', // empty string
    '123', // only numbers
    '.abc', // periods
    'dot.case', // periods
  ];

  for (const input of invalidInputs)
  {
    const result = AlphabeticOrUnderscoreOrHyphenString.try(input);
    assertEquals(result, undefined);
  }
});

Deno.test('AlphabeticOrUnderscoreOrHyphenString - assert throws with descriptive message', () =>
{
  assertThrows(
    () => AlphabeticOrUnderscoreOrHyphenString.assert('Hello.World123!'),
    Error,
    'Invalid string did not pass validation: Supplied value "Hello.World123!" is not valid for validator "AlphabeticOrUnderscoreOrHyphenString" (must contain only letters (A-Z, a-z), underscores, or hyphens).',
  );
});

Deno.test('AlphabeticOrUnderscoreOrHyphenString - type safety', () =>
{
  // @ts-expect-error Type 'string' is not assignable to type 'AlphabeticOrUnderscoreOrHyphenString'
  const _invalid: AlphabeticOrUnderscoreOrHyphenString = 'Hello.World';

  const valid: AlphabeticOrUnderscoreOrHyphenString = AlphabeticOrUnderscoreOrHyphenString.assert(
    'Hello-World_Example',
  );
  assertEquals(valid, 'Hello-World_Example');
});
