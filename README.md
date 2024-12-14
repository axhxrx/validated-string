# @axhxrx/validated-strings

A library to help make runtime-validated strings, while still preserving a modicum of type-safety at build-time. Intended for specialized string types that are too complex to be modeled within the type system itself, e.g. "starts with an alphanumeric character and less than 1000 characters long, with at least three swear words", or "three words in German, separated by spaces", etc.

Example:

```ts
// Define a validator function:
const isCowName = (s: string) => [
  'Bessie',
  'Daisy',
  'Elsie',
  'Flora',
  'Hedda',
].includes(s);

// Use the validator to create a new factory and type, and give them the same name:
const { factory, type } = ValidatedString.create(isCowName);
export const CowName = factory;
export type CowName = typeof type;

// Now, we can use `CowName` in both contexts:
const x = CowName.try('Bessie'); // x is 'Bessie'
const y: CowName | undefined = CowName.try('not a cow name'); // y is undefined
const z: CowName = CowName.assert('Bessie'); // z is 'Bessie'
const ohFuck: never = CowName.assert('not a cow name'); // throws an error
```

That's useful when you want to worry about the validation only in one spot, and lean on the type system elsewhere. E.g.:

```ts
// Here, we will get a build-time error if we try to just use some un-checked `string` instead of a validated `CowName`:
function callCow(cowName: CowName)
{
  const audio = TextToSpeech.getAudio(`Hey, ${cowName}! Come on home!`);
  while (!Barn.contains(cowName))
  {
    LoudSpeaker.play(audio);
    sleep(10);
  }
}

// Meanwhile, on the other side of town...

class FarmOperatorConsole
{
  callCow()
  {
    console.log('Enter the cow name you wish to call:');
    const cowName = getOperatorInput(); // string

    const validatedCowName = CowName.try(cowName);
    if (validatedCowName)
    {
      // Once we've done the validation here at the boundary of our system, the rest of the internals can just use `CowName` instead of `string`, and not worry about validation.
      callCow(validatedCowName);
    }
    else
    {
      console.log('Invalid cow name. Please try again.');
      this.callCow();
    }
  }
}
```

## License

MIT or WTFPL, your choice.
