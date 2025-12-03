import { describe, test, assertType } from 'vitest'
import type { DeepOmit, DeepOptional, DeepPaths } from './index.ts'

describe('DeepOptional', () => {
    test('simple examples', () => {
        assertType<DeepOptional<{ a: string }, 'a'>>({} as { a?: string })
        assertType<DeepOptional<{ a: string, b: number }, 'a'>>({} as { a?: string, b: number })
        assertType<DeepOptional<{ a: string, b: number, c: boolean }, 'a' | 'b'>>({} as { a?: string, b?: number, c: boolean })

        // @ts-expect-error - `b` is not a valid path
        assertType<DeepOptional<{ a: string }, 'b'>>('' as any)
    });

    test('deeply nested object', () => {
        assertType<DeepOptional<{ a: { b: { c: string } } }, 'a.b.c'>>({} as { a: { b: { c?: string } } })
    })

    test('deep arrays', () => {
        assertType<DeepOptional<{ a: { b: { c: string, d: Array<{ e: string}> } } }, `a.b.d.${number}.e`>>({} as { a: { b: { c: string, d: Array<{ e?: string }> } } })
    })
})

describe('DeepOmit', () => {
    test('simple examples', () => {
        assertType<DeepOmit<{ a: string }, 'a'>>({} as {})
        assertType<DeepOmit<{ a: string, b: number }, 'a'>>({} as { b: number })
        assertType<DeepOmit<{ a: string, b: number, c: boolean }, 'a' | 'b'>>({} as { c: boolean })

        // @ts-expect-error - `b` is not a valid path
        assertType<DeepOmit<{ a: string }, 'b'>>('' as any)
    })

    test('deeply nested object', () => {
        assertType<DeepOmit<{ a: { b: { c: string } } }, 'a.b.c'>>({} as { a: { b: {} } })
    })

    test('deep arrays', () => {
        assertType<DeepOmit<{ a: { b: { c: string, d: Array<{ e: string, f: number }> } } }, `a.b.d.${number}.e`>>({} as { a: { b: { c: string, d: Array<{ f: number }> } } })
    })
})

describe('DeepPaths', () => {
    test('simple object', () => {
        assertType<DeepPaths<{ a: string }>>('a')
        assertType<DeepPaths<{ a: string, b: number }>>('' as 'a' | 'b')
    })

    test('nested objects', () => {
        assertType<DeepPaths<{ a: { b: string } }>>('' as 'a' | 'a.b')
    })

    test('nested arrays', () => {
        assertType<DeepPaths<{ a: Array<{ b: string }> }>>('' as 'a' | `a.${number}.b`)
    })

    test('arrays', () => {
        assertType<DeepPaths<Array<string>>>('' as `${number}`)
    })

    test('arrays of objects', () => {
        assertType<DeepPaths<Array<{ a: string }>>>('' as `${number}` | `${number}.a`)
    })
})