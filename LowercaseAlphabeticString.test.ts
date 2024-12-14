import { assertEquals, assertThrows } from '@std/assert';
import { LowercaseAlphabeticString } from './LowercaseAlphabeticString.ts';

Deno.test('LowercaseAlphabeticString - validates lowercase letters', () =>
{
  const validInputs = ['hello', 'abc', 'z'];
  for (const input of validInputs)
  {
    const result = LowercaseAlphabeticString.try(input);
    assertEquals(result, input);
  }
});

Deno.test('LowercaseAlphabeticString - rejects invalid inputs', () =>
{
  const invalidInputs = [
    'Hello', // uppercase
    'abc123', // numbers
    'hello!', // special characters
    'hello world', // spaces
    '', // empty string
  ];

  for (const input of invalidInputs)
  {
    const result = LowercaseAlphabeticString.try(input);
    assertEquals(result, undefined);
  }
});

Deno.test('LowercaseAlphabeticString - assert throws with descriptive message', () =>
{
  assertThrows(
    () => LowercaseAlphabeticString.assert('Hello123!'),
    Error,
    'Invalid string did not pass validation: Supplied value "Hello123!" is not valid for validator "LowercaseAlphabeticString" (must contain only lowercase letters a-z).',
  );
});

Deno.test('LowercaseAlphabeticString - type safety', () =>
{
  // @ts-expect-error Type 'string' is not assignable to type 'LowercaseAlphabeticString'
  const _invalid: LowercaseAlphabeticString = 'ABC';

  const valid: LowercaseAlphabeticString = LowercaseAlphabeticString.assert('hello');
  assertEquals(valid, 'hello');
});
