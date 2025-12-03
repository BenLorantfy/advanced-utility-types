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

## License

MIT

