# advanced-utility-types
Advanced utility generics for typescript

## Documentation

- [DeepOptional<T, P>](#deepoptionalt-p)
- [DeepOmit<T, P>](#deepomitt-p)

### `DeepOptional<T, P>`

Recursively makes certain properties optional in an object type, even if they're deeply nested.

- `T`: The original object type.
- `P`: A string or union of dot-separated string paths indicating which properties (even deeply nested ones) should be made optional.

#### Example

```ts
type Obj = {
  a: string,
  b: {
    c: number,
    d: {
      e: boolean
    }
  }
};

type Result = DeepOptional<Obj, 'b.d.e'>;
// Result is:
// {
//   a: string,
//   b: {
//     c: number,
//     d: {
//       e?: boolean
//     }
//   }
// }
```

You can also use template literals for arrays:

```ts
type ArrObj = { a: { b: Array<{ c: string }> } };
type Result = DeepOptional<ArrObj, `a.b.${number}.c`>; 
// Result is:
// {
//   a: string,
//   b: Array<{
//     c?: string,
//   }>
// }
```

---

### `DeepOmit<T, P>`

Recursively omits certain properties from an object type, even if they're deeply nested.

- `T`: The original object type.
- `P`: A string or union of dot-separated string paths indicating which properties (even deeply nested ones) should be omitted.

#### Example

```ts
type Obj = {
  a: string,
  b: {
    c: number,
    d: {
      e: boolean
    }
  }
};

type Result = DeepOmit<Obj, 'b.d.e'>;
// Result is:
// {
//   a: string,
//   b: {
//     c: number,
//     d: {}
//   }
// }
```

Arrays are supported just like with `DeepOptional`:

```ts
type ArrObj = { a: { b: Array<{ c: string, d: number }> } };
type Result = DeepOmit<ArrObj, `a.b.${number}.c`>;
// Result is:
// { a: { b: Array<{ d: number }> } }
```

---

### `DeepPaths<T>`

Computes all possible dot-separated property paths for a given object or array type `T`. This is especially useful for referencing deeply nested properties in other utility types like `DeepOptional` and `DeepOmit`.

- `T`: The object or array type to extract paths from.

#### Example usage

```ts
type Example = {
  a: string,
  b: {
    c: number,
    d: {
      e: boolean
    }
  },
  f: Array<{ g: string }>
};

type Paths = DeepPaths<Example>;
// Paths is:
//   | 'a'
//   | 'b'
//   | 'b.c'
//   | 'b.d'
//   | 'b.d.e'
//   | 'f'
//   | `f.${number}`
//   | `f.${number}.g`

type ArrayPaths = DeepPaths<Array<{ x: number; y: string }>>;
// ArrayPaths is:
//   | `${number}`
//   | `${number}.x`
//   | `${number}.y`
```

Supported features include deeply nested objects, arrays of objects, and arrays of primitives. Nested arrays will generate paths using `${number}` to indicate any index.

## License

MIT

