import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, expect, test } from 'vitest'
import { render } from '@/test'
import { Posts } from './Posts'
import { usePosts } from './hooks'
import { successResponse as mockedPosts } from './__mocks__'

// alternatively, you could renderWithClient(<Posts />)
// and intercept the API call in this file
vi.mock('./hooks/usePosts', () => ({
	usePosts: vi.fn()
}))

// Remove this and see the difference in a snapshot (it's far more readable this way)
// vi.mock('lucide-react', async (importOriginal) => {
// 	const mod = await importOriginal()
// 	return {
// 		...mod,
// 		ScrollTextIcon: (props) => <div {...props}>ScrollTextIcon</div>,
// 	}
// })

describe('Posts', () => {
	test('should match snapshot when there is an error', () => {
		usePosts.mockReturnValue({
			status: 'error',
			error: new Error('An error occurred!')
		})

		// using MemoryRouter allows to prevent mocking react-router-dom :)
		const { container } = render(<Posts />, { wrapper: MemoryRouter })
		expect(container.firstChild).toMatchSnapshot()
	})

	test('should match snapshot when loading', () => {
		usePosts.mockReturnValue({
			status: 'pending' 
		})

		const { container } = render(<Posts />, { wrapper: MemoryRouter })
		expect(container.firstChild).toMatchSnapshot()
	})

	test('should match snapshot when data is available', () => {
		usePosts.mockReturnValue({
			status: 'success',
			data: mockedPosts
		})

		const { container } = render(<Posts />, { wrapper: MemoryRouter })
		expect(container.firstChild).toMatchSnapshot()
	})
})