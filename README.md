[![npm version](https://img.shields.io/npm/v/@itrocks/length?logo=npm)](https://www.npmjs.org/package/@itrocks/length)
[![npm downloads](https://img.shields.io/npm/dm/@itrocks/length)](https://www.npmjs.org/package/@itrocks/length)
[![GitHub](https://img.shields.io/github/last-commit/itrocks-ts/length?color=2dba4e&label=commit&logo=github)](https://github.com/itrocks-ts/length)
[![issues](https://img.shields.io/github/issues/itrocks-ts/length)](https://github.com/itrocks-ts/length/issues)
[![discord](https://img.shields.io/discord/1314141024020467782?color=7289da&label=discord&logo=discord&logoColor=white)](https://25.re/ditr)

# length

Decorators @Length, @MinLength, @MaxLength to enforce fixed or flexible string length limits on class properties.

*This documentation was written by an artificial intelligence and may contain errors or approximations.
It has not yet been fully reviewed by a human. If anything seems unclear or incomplete,
please feel free to contact the author of this package.*

## Installation

```bash
npm i @itrocks/length
```

## Usage

`@itrocks/length` provides three property decorators:

- `@Length(length)` – enforces an exact length
- `@MinLength(length)` – enforces a minimum length
- `@MaxLength(length)` – enforces a maximum length

and a set of helper functions to read the configured limits:

- `lengthOf(target, property)`
- `minLengthOf(target, property)`
- `maxLengthOf(target, property)`

The decorators themselves do not perform validation. Instead, they store
metadata that other parts of your application (or other `@itrocks/*`
packages) can use to validate values, generate schemas, or build forms.

### Minimal example

```ts
import { Length } from '@itrocks/length'

class Code
{
	// Always exactly 6 characters
	@Length(6)
	value = ''
}
```

Here, a generic validator can read the `Length` decorator metadata and
ensure that `value` is always exactly 6 characters long.

### Complete example with flexible limits

This example combines `MinLength` and `MaxLength` to define a
user-friendly constraint on a string property, and then uses the
`*Of` helper functions to read the configuration:

```ts
import type { ObjectOrType }                 from '@itrocks/class-type'
import { Length, MaxLength, MinLength,
	lengthOf, maxLengthOf, minLengthOf }       from '@itrocks/length'

class User
{
	// Username must be between 3 and 20 characters
	@MinLength(3)
	@MaxLength(20)
	username = ''

	// Activation code must be exactly 8 characters
	@Length(8)
	activationCode = ''
}

function getStringLengthConstraints<T extends object>(
	type: ObjectOrType<T>,
	property: keyof T,
)
{
	return {
		length   : lengthOf(type, property),
		minLength: minLengthOf(type, property),
		maxLength: maxLengthOf(type, property),
	}
}

// Example usage
const usernameConstraints = getStringLengthConstraints(User, 'username')
// => { length: undefined, minLength: 3, maxLength: 20 }

const codeConstraints = getStringLengthConstraints(User, 'activationCode')
// => { length: 8, minLength: 0, maxLength: undefined }
```

In practice, you will typically let other `@itrocks/*` packages (like
schema builders or form generators) consume these decorators instead of
calling the helper functions directly.

## API

### `function Length<T extends object>(length?: number): DecorateCaller<T>`

Property decorator indicating that a field must have an exact string
length.

#### Parameters

- `length` *(optional)* – required length of the string. If omitted, the
  length constraint is left undefined and can be interpreted by your
  own tooling. In most situations, you will pass a positive integer.

#### Return value

- `DecorateCaller<T>` – function from
  `@itrocks/decorator/property` used internally when the decorator is
  applied by TypeScript. You normally do not call it directly.

#### Example

```ts
class Product
{
	@Length(13)
	barcode = ''
}
```

---

### `function lengthOf<T extends object>(target: ObjectOrType<T>, property: KeyOf<T>): number | undefined`

Reads the exact length configured with `@Length()` for a given
property.

#### Parameters

- `target` – the class (`User`) or instance (`new User()`) that owns the
  property.
- `property` – name of the property to inspect.

#### Return value

- `number | undefined` – the configured exact length, or `undefined` if
  no `@Length()` decorator is present on that property.

---

### `function MinLength<T extends object>(length?: number): DecorateCaller<T>`

Property decorator indicating that a field must have at least the given
string length.

#### Parameters

- `length` *(optional, default: `0`)* – minimum allowed length. If not
  provided, the minimum length is considered to be `0`.

#### Return value

- `DecorateCaller<T>` – function from
  `@itrocks/decorator/property` used internally when the decorator is
  applied.

#### Example

```ts
class Comment
{
	// At least 10 characters
	@MinLength(10)
	body = ''
}
```

---

### `function minLengthOf<T extends object>(target: ObjectOrType<T>, property: KeyOf<T>): number`

Reads the minimum length configured with `@MinLength()` for a given
property.

#### Parameters

- `target` – the class or instance that owns the property.
- `property` – name of the property to inspect.

#### Return value

- `number` – the minimum length defined on the property. If no
  `@MinLength()` decorator is present, this function returns `0`.

---

### `function MaxLength<T extends object>(length?: number): DecorateCaller<T>`

Property decorator indicating that a field must not exceed the given
string length.

#### Parameters

- `length` *(optional)* – maximum allowed length. If omitted, the
  constraint is left undefined and can be interpreted by your tooling.

#### Return value

- `DecorateCaller<T>` – function from
  `@itrocks/decorator/property` used internally when the decorator is
  applied.

#### Example

```ts
class Message
{
	// No more than 280 characters
	@MaxLength(280)
	body = ''
}
```

---

### `function maxLengthOf<T extends object>(target: ObjectOrType<T>, property: KeyOf<T>): number | undefined`

Reads the maximum length configured with `@MaxLength()` for a given
property.

#### Parameters

- `target` – the class or instance that owns the property.
- `property` – name of the property to inspect.

#### Return value

- `number | undefined` – the maximum length defined on the property, or
  `undefined` if no `@MaxLength()` decorator is present.

## Typical use cases

- Define exact-length identifiers such as activation codes, barcodes, or
  short hashes using `@Length()`.
- Enforce user-facing rules on text fields, like minimum and maximum
  length for usernames, passwords, comments, or messages.
- Drive generic validation logic that checks string length constraints
  based on decorator metadata instead of hard-coding them.
- Generate JSON Schemas or other schema formats that include
  `minLength`, `maxLength`, or exact-length constraints.
- Configure length limits once on your domain model and reuse them
  across back-end validation, front-end forms, and documentation.
