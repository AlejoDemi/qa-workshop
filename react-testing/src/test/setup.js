import '@testing-library/jest-dom'
import { afterEach, beforeAll, afterAll } from 'vitest'
import { cleanup } from './utils'
import { server } from './msw'

// Establish API mocking before all tests.
beforeAll(() => server.listen())

afterEach(() => {
	// Reset any request handlers that we may add during the tests,
	// so they don't affect other tests.
	server.resetHandlers()
	// unmount react trees after each test to prevent memory leaks
	cleanup()
})

// Clean up after the tests are finished.
afterAll(() => server.close())