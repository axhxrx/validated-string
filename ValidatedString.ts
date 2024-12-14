/**
 An interface for factories that create validated strings. Consumers of this library shouldn't need to use it directly.
 */
interface ValidatedStringFactory<ValidatorT>
{
  /**
     The `try()` method returns the validated string if it's valid, or `undefined` if it isn't.
     */
  try(value: string): ValidatedString<ValidatorT> | undefined;
  /**
     The `assert()` method returns the validated string if it's valid, or throws an `Error` if it isn't. Not that the error message will contain the string `value` supplied, so take precautions if `value` is sensitive.
     */
  assert(value: string): ValidatedString<ValidatorT>;
}

/**
 The `ValidatedString` is an internal [branded string type](https://news.ycombinator.com/item?id=40146751) used to enforce the validation. Consumers of this library shouldn't need to use it directly.
 */
type ValidatedString<ValidatorT> = string & { readonly __ブランド: ValidatorT };

/**
 The `ValidatedString.create()` function creates a factory and a type intended to be used to create new validated string types. It does a wee bit of TypeScript type system jiggery-pokery to make this usage work:
 ```ts
 // Define a validator function:
 const isAwesome = (s: string) => s === 'awesome';

 // Use the validator to create a new factory and type, and give them the same name:
 const { factory, type } = ValidatedString.create(isAwesome);
 export const AwesomeString = factory;
 export type AwesomeString = typeof type;

 // NOTE: This is the intended usage, but isn't actually required if it makes you feel yucky (you could just use factory.try() and factory.assert() directly in that case 😅).

 // Now, we can use `AwesomeString` in both contexts:
 const x = AwesomeString.try('awesome'); // x is 'awesome'
 const y = AwesomeString.try('not awesome'); // y is undefined
 const z: AwesomeString = AwesomeString.assert('awesome'); // z is 'awesome'
 const ohFuck = AwesomeString.assert('not awesome'); // throws an error
 ```
 */
function create<ValidatorT extends (s: string) => boolean>(
  /**
     The validator function for the validated string type. E.g. `isAlphanumeric`, `isCowName`, `isCussWord`, etc — whatever you want to implement.
     */
  validator: ValidatorT,
  /**
     Optional name and description for the validated string type — these will only be used in the message field of any `Error` thrown by the `assert()` method.
     */
  options: { name?: string; description?: string } = {},
): {
  /**
     The factory object for the validated string, which exposes the `try` and `assert` methods.
     */
  factory: ValidatedStringFactory<ValidatorT>;
  /**
      The type of the validated string. NOTE: this value doesn't actually exist at runtime, so don't use it for anything other than defining the type for your validated string.

      Example:
      ```ts
      const { factory, type } = ValidatedString.create(isCowName);
      export type CowName = typeof type;
      export const CowName = factory; // Optional, but 🧑‍🍳💋
      ```
      */
  type: ValidatedString<ValidatorT>;
}
{
  const factory = {
    /**
         The `try()` method returns the validated string if it's valid, or `undefined` if it isn't.
         */
    try(value: string)
    {
      return validator(value) ? (value as ValidatedString<ValidatorT>) : undefined;
    },
    /**
         The `assert()` method returns the validated string if it's valid, or throws an error if it isn't.
         */
    assert(value: string)
    {
      if (!validator(value))
      {
        const name = options.name || validator.toString().substring(0, 64).concat('...');
        const description = options.description || '';
        const supplied = value.length > 64 ? value.substring(0, 64).concat('...') : value;
        throw new Error(
          `Invalid string did not pass validation: Supplied value "${supplied}" is not valid for validator "${name}"${
            description ? ` (${description})` : ''
          }.`,
        );
      }
      return value as ValidatedString<ValidatorT>;
    },
  } as ValidatedStringFactory<ValidatorT>;

  const type =
    'This value is fake! ValidatedString created it for evildoing, and you are holding it wrong!' as unknown as ValidatedString<
      ValidatorT
    >;

  return {
    factory,
    type,
  };
}

export const ValidatedString = {
  create,
} as const;
