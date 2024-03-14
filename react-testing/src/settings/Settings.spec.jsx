import React from 'react'
import { describe, expect, test, vi, afterEach } from 'vitest'
import { render } from '@/test'
import { Settings } from './Settings'
import { AccountTab, PasswordTab } from './tabs'

// Shallow rendering child components.
// It's ideal to use if, say, AccountTab or PasswordTab have external dependencies
// such as a useDispatch redux hook which you don't care about when testing this parent component.
// 1) Pros: makes parent component snapshot smaller and therefore more readable.
// 2) Trade-off / Cons: you should have tests for AccountTab and PasswordTab to make sure they work as expected.
vi.mock('./tabs', () => ({
	AccountTab: vi.fn(() => 'AccountTab'),
	PasswordTab: vi.fn(() => 'PasswordTab')
}))

describe('Settings', () => {
	afterEach(() => {
		vi.clearAllMocks()
	})

	test('should match snapshot', () => {
		const { container } = render(<Settings />)
		expect(container.firstChild).toMatchSnapshot()
	})

	test('should call AccountTab and pass props', () => {
		render(<Settings />)
		expect(AccountTab).toHaveBeenCalledTimes(1)
		expect(AccountTab).toHaveBeenCalledWith({}, expect.anything())
	})

	// test.todo('should call PasswordTab and pass props', () => {})
})