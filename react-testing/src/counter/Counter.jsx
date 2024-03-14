import React, { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCounter } from './hooks'
import PropTypes from 'prop-types'

export const Counter = ({ initialValue, ...props }) => {
  const { count, decrement, reset, increment, setCount } = useCounter(initialValue)

  const setCounter = useCallback((e) => {
    setCount(e.target.value)
  }, [setCount])

  return (
    <div className='flex flex-col items-center gap-2' {...props}>
      <Input
        placeholder='Count'
        type='number'
        onChange={setCounter}
        value={count}
      />
      <div className='flex items-center justify-between w-full'>
        <Button onClick={decrement}>-</Button>
        <Button onClick={reset}>Reset</Button>
        <Button onClick={increment}>+</Button>
      </div>
    </div>
  )
}

Counter.propTypes = {
  initialValue: PropTypes.number
}

Counter.defaultProps = {
  initialValue: 0
}
