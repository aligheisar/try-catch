# @aligheisar/try-catch

A tiny utility for handling async errors without `try/catch` blocks.

This package wraps a promise and returns a typed, predictable result object instead of throwing, making error handling easier and more explicit.

## Installation

```bash
npm install @aligheisar/try-catch
```

or

```bash
pnpm add @aligheisar/try-catch
```

or

```bash
yarn add @aligheisar/try-catch
```

## The idea

JavaScript promises throw errors.
This utility turns that behavior into data.

Instead of:

```ts
try {
  const data = await doSomething();
} catch (err) {
  // handle error
}
```

You get:

```ts
const result = await tryCatch(doSomething());
```

…and handle success and failure explicitly.

## API

### tryCatch

```ts
type TryCatchResult<T, E> =
  | { success: true; data: T }
  | { success: false; error: E };

function tryCatch<T, E = unknown>(
  promise: Promise<T>
): Promise<TryCatchResult<T, E>>;
```

## Basic usage

```ts
import { tryCatch } from "@aligheisar/try-catch";

const result = await tryCatch(fetch("/api/user"));

if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
```

## With typed errors

```ts
type ApiError = {
  message: string;
  code: number;
};

const result = await tryCatch<Response, ApiError>(
  fetch("/api/user")
);

if (!result.success) {
  console.error(result.error.code);
}
```

## Why use this?

* No `try/catch` nesting
* Explicit success and failure paths
* Works well with functional or result-based patterns
* Fully typed and predictable
* Zero dependencies
