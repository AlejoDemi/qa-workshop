import { describe, expect, test, } from 'vitest'
import { renderHook, act } from '@/test'
import { useCounter } from './useCounter'

describe('useCounter', () => {
	test('should return count=0 if no initialValue is provided', () => {
		const { result } = renderHook(() => useCounter()) // syntax 1
		expect(result.current).toEqual({
			count: 0,
			setCount: expect.any(Function),
			increment: expect.any(Function),
			decrement: expect.any(Function),
			reset: expect.any(Function),
		})
	})

	test('should return count=initialValue if provided', () => {
		const { result } = renderHook(useCounter, { initialProps: 5 }) // syntax 2
		expect(result.current).toEqual({
			count: 5,
			setCount: expect.any(Function),
			increment: expect.any(Function),
			decrement: expect.any(Function),
			reset: expect.any(Function),
		})
	})

	test('should increment count v1', () => {
		const { result } = renderHook((args) => useCounter(args), { initialProps: 10 }) // syntax 3
		const { increment } = result.current

		// act() is needed here because state updates are asynchronous
		act(() => {
			increment()
		})

		expect(result.current.count).toEqual(11)
	})

	test('should decrement count', () => {
		const { result } = renderHook(() => useCounter(5))
		const { decrement } = result.current

		act(() => {
			decrement()
		})
		
		expect(result.current.count).toEqual(4)
	})

	test('should reset count', () => {
		const { result } = renderHook(() => useCounter(5))
		const { increment, reset } = result.current

		act(() => {
			increment()
			increment()
			reset()
		})
		
		expect(result.current.count).toEqual(5)
	})
})