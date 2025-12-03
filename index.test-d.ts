import { describe, test, assertType } from 'vitest'
import type { DeepOmit, DeepOptional } from './index.ts'

describe('DeepOptional', () => {
    test('simple examples', () => {
        assertType<DeepOptional<{ a: string }, 'a'>>({} as { a?: string })
        assertType<DeepOptional<{ a: string, b: number }, 'a'>>({} as { a?: string, b: number })
        assertType<DeepOptional<{ a: string, b: number, c: boolean }, 'a' | 'b'>>({} as { a?: string, b?: number, c: boolean })
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
    })

    test('deeply nested object', () => {
        assertType<DeepOmit<{ a: { b: { c: string } } }, 'a.b.c'>>({} as { a: { b: {} } })
    })

    test('deep arrays', () => {
        assertType<DeepOmit<{ a: { b: { c: string, d: Array<{ e: string, f: number }> } } }, `a.b.d.${number}.e`>>({} as { a: { b: { c: string, d: Array<{ f: number }> } } })
    })
})