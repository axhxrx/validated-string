import { assertEquals, assertThrows } from '@std/assert';
import { AlphabeticString } from './AlphabeticString.ts';

Deno.test('AlphabeticString - validates mixed-case letters', () =>
{
  const validInputs = [
    'Hello',
    'WORLD',
    'CamelCase',
    'abc',
    'ABC',
    'Z',
  ];

  for (const input of validInputs)
  {
    const result = AlphabeticString.try(input);
    assertEquals(result, input);
  }
});

Deno.test('AlphabeticString - rejects invalid inputs', () =>
{
  const invalidInputs = [
    'Hello123', // numbers
    'Hello!', // special characters
    'Hello World', // spaces
    '', // empty string
    '123', // only numbers
    '_abc', // underscores
  ];

  for (const input of invalidInputs)
  {
    const result = AlphabeticString.try(input);
    assertEquals(result, undefined);
  }
});

Deno.test('AlphabeticString - assert throws with descriptive message', () =>
{
  assertThrows(
    () => AlphabeticString.assert('Hello123!'),
    Error,
    'Invalid string did not pass validation: Supplied value "Hello123!" is not valid for validator "AlphabeticString" (must contain only letters (A-Z, a-z)).',
  );
});

Deno.test('AlphabeticString - type safety', () =>
{
  // This would cause a TypeScript error if uncommented:
  // @ts-expect-error Type 'string' is not assignable to type 'AlphabeticString'
  const _invalid: AlphabeticString = 'Hello123';

  const valid: AlphabeticString = AlphabeticString.assert('Hello');
  assertEquals(valid, 'Hello');
});
