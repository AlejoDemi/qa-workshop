import { useCallback, useState } from 'react'

export const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => {
    setCount((c) => c + 1)
  }, [])

  const decrement = useCallback(() => {
    setCount((c) => c - 1)
  }, [])

  const reset = useCallback(() => {
    setCount(initialValue)
  }, [initialValue])

	return {
		count,
		setCount,
		increment,
		decrement,
		reset,
	}
}
