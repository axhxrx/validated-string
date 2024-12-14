import { assertEquals, assertThrows } from '@std/assert';
import { ValidatedString } from './ValidatedString.ts';

Deno.test('ValidatedString - basic validation with try()', () =>
{
  const isHello = (s: string) => s === 'hello';
  const { factory } = ValidatedString.create(isHello);

  const validResult = factory.try('hello');
  assertEquals(validResult, 'hello');

  const invalidResult = factory.try('hi');
  assertEquals(invalidResult, undefined);
});

Deno.test('ValidatedString - assert() with valid input', () =>
{
  const isHello = (s: string) => s === 'hello';
  const { factory } = ValidatedString.create(isHello);

  const result = factory.assert('hello');
  assertEquals(result, 'hello');
});

Deno.test('ValidatedString - assert() with invalid input throws error', () =>
{
  const isHello = (s: string) => s === 'hello';
  const { factory } = ValidatedString.create(isHello);

  assertThrows(
    () => factory.assert('hi'),
    Error,
    `Invalid string did not pass validation: Supplied value "hi" is not valid for validator "(s)=>s === 'hello'..."`,
  );
});

Deno.test('ValidatedString - custom name and description in error message', () =>
{
  const isHello = (s: string) => s === 'hello';
  const { factory } = ValidatedString.create(isHello, {
    name: 'HelloString',
    description: "must be exactly 'hello'",
  });

  assertThrows(
    () => factory.assert('hi'),
    Error,
    'Invalid string did not pass validation: Supplied value "hi" is not valid for validator "HelloString" (must be exactly \'hello\').',
  );
});

Deno.test('ValidatedString - long input string gets truncated in error', () =>
{
  const isShort = (s: string) => s.length < 10;
  const { factory } = ValidatedString.create(isShort);

  const longString = 'a'.repeat(100);
  const expectedTruncated = 'a'.repeat(64) + '...';

  assertThrows(
    () => factory.assert(longString),
    Error,
    `Invalid string did not pass validation: Supplied value "${expectedTruncated}" is not valid for validator "(s)=>s.length < 10..."`,
  );
});

Deno.test('ValidatedString - type safety', () =>
{
  const isHello = (s: string) => s === 'hello';
  const { factory, type } = ValidatedString.create(isHello);
  type HelloString = typeof type;

  // This line would cause a TypeScript compilation error if uncommented:
  // @ts-expect-error Type 'string' is not assignable to type 'HelloString'.
  const _invalid: HelloString = 'hi';

  const valid: HelloString = factory.assert('hello');
  assertEquals(valid, 'hello');
});
