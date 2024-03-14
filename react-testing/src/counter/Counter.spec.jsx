import React from 'react'
import { describe, expect, test } from 'vitest'
import { fireEvent, render, screen } from '@/test'
import { Counter } from './Counter'

describe('Counter', () => {
	test('should match snapshot without initialValue', () => {
		const { container } = render(<Counter />)
		expect(container.firstChild).toMatchSnapshot()

		// without snapshots
		// const input = screen.getByPlaceholderText('Count')
		// expect(input.value).toEqual('0')
		// expect(screen.queryByText('-')).toBeInTheDocument()
		// expect(screen.queryByText('Reset')).toBeInTheDocument()
		// expect(screen.queryByText('+')).toBeInTheDocument()
	})

	test('should match snapshot with initialValue', () => {
		const { container } = render(<Counter initialValue={10} />)
		expect(container.firstChild).toMatchSnapshot()
	})

	test('should increment', () => {
		const { getByRole } = render(<Counter />)
		// you can use getByRole returned by the render() method
		fireEvent.click(getByRole('button', { name: '+' }))
		expect(getByRole('spinbutton', { value: 0 })).toBeInTheDocument()
	})

	test('should decrement', () => {
		render(<Counter />)
		// you can also use screen.getByRole
		fireEvent.click(screen.getByRole('button', { name: '-' }))
		expect(screen.getByRole('spinbutton', { value: -1 })).toBeInTheDocument()
	})

	test('should reset', () => {
		render(<Counter initialValue={5} />)
		const incrementBtn = screen.getByRole('button', { name: '+' })
		fireEvent.click(incrementBtn)
		fireEvent.click(incrementBtn)
		expect(screen.getByRole('spinbutton', { value: 7 })).toBeInTheDocument()
		fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
		expect(screen.getByRole('spinbutton', { value: 5 })).toBeInTheDocument()
	})
})