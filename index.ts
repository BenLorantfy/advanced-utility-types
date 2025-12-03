// Copied from utility-types
// https://github.com/piotrwitek/utility-types/blob/master/src/mapped-types.ts#L567C1-L571C23
export type Optional<T extends object, K extends keyof T = keyof T> = Omit<
  T,
  K
> &
  Partial<Pick<T, K>>;

// Copied from utility-types
// https://github.com/piotrwitek/utility-types/blob/master/src/mapped-types.ts#L573C1-L609C11
type ValuesType<
  T extends ReadonlyArray<any> | ArrayLike<any> | Record<any, any>
> = T extends ReadonlyArray<any>
  ? T[number]
  : T extends ArrayLike<any>
  ? T[number]
  : T extends object
  ? T[keyof T]
  : never;

export type DeepPrettify<T> = 
    T extends Record<string, unknown> ? { [K in keyof T]: DeepPrettify<T[K]> } & {} : 
    T extends unknown[] ? Array<DeepPrettify<T[number]>> :
    T;

type DeepOptionalRecursive<T, P extends string, Root extends string = ''> = 
    T extends Record<string, unknown> ? Optional<{ [K in Extract<keyof T, string>]: DeepOptionalRecursive<T[K], P, Root extends '' ? K : `${Root}.${K}`> }, GetMatchingKeys<T, P, Root>> :
    T extends unknown[] ? Array<DeepOptionalRecursive<T[number], P, Root extends '' ? `${number}` : `${Root}.${number}`>> :
    T;

export type DeepOptional<T, P extends string > = DeepPrettify<DeepOptionalRecursive<T, P>>;

type GetMatchingKeys<T, P extends string, Root extends string = ''> = ValuesType<{
    [K in Extract<keyof T, string>]: Root extends '' ? K extends P ? K : never : `${Root}.${K}` extends P ? K : never
}>

export type DeepOmit<T, P extends string > = DeepPrettify<DeepOmitRecursive<T, P>>;

type DeepOmitRecursive<T, P extends string, Root extends string = ''> = 
    T extends Record<string, unknown> ? Omit<{ [K in Extract<keyof T, string>]: DeepOmitRecursive<T[K], P, Root extends '' ? K : `${Root}.${K}`> }, GetMatchingKeys<T, P, Root>> :
    T extends unknown[] ? Array<DeepOmitRecursive<T[number], P, Root extends '' ? `${number}` : `${Root}.${number}`>> :
    T;