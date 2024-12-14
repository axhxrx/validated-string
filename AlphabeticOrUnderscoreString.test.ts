import { assertEquals, assertThrows } from '@std/assert';
import { AlphabeticOrUnderscoreString } from './AlphabeticOrUnderscoreString.ts';

Deno.test('AlphabeticOrUnderscoreString - validates letters and underscores', () =>
{
  const validInputs = [
    'Hello',
    'WORLD',
    'snake_case',
    'SCREAMING_SNAKE_CASE',
    'abc',
    'ABC',
    '_leading',
    'trailing_',
    '_',
    '__double__underscore__',
  ];

  for (const input of validInputs)
  {
    const result = AlphabeticOrUnderscoreString.try(input);
    assertEquals(result, input);
  }
});

Deno.test('AlphabeticOrUnderscoreString - rejects invalid inputs', () =>
{
  const invalidInputs = [
    'Hello123', // numbers
    'Hello!', // special characters
    'Hello World', // spaces
    '', // empty string
    '123', // only numbers
    '-abc', // hyphens
    'snake-case', // hyphens
  ];

  for (const input of invalidInputs)
  {
    const result = AlphabeticOrUnderscoreString.try(input);
    assertEquals(result, undefined);
  }
});

Deno.test('AlphabeticOrUnderscoreString - assert throws with descriptive message', () =>
{
  assertThrows(
    () => AlphabeticOrUnderscoreString.assert('Hello-World123!'),
    Error,
    'Invalid string did not pass validation: Supplied value "Hello-World123!" is not valid for validator "AlphabeticOrUnderscoreString" (must contain only letters (A-Z, a-z) or underscores).',
  );
});

Deno.test('AlphabeticOrUnderscoreString - type safety', () =>
{
  // @ts-expect-error Type 'string' is not assignable to type 'AlphabeticOrUnderscoreString'
  const _invalid: AlphabeticOrUnderscoreString = 'Hello-World';

  const valid: AlphabeticOrUnderscoreString = AlphabeticOrUnderscoreString.assert('Hello_World');
  assertEquals(valid, 'Hello_World');
});
