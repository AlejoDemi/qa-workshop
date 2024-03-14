import React from 'react'
import { render } from './rtl'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const createTestQueryClient = () => new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
	logger: {
		log: console.log,
		warn: console.warn,
		error: () => {},
	}
})

export function renderWithClient(ui) {
    const testQueryClient = createTestQueryClient()
    const { rerender, ...result } = render(
      <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
    )
    return {
			...result,
			rerender: (rerenderUi) =>
				rerender(
					<QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>
				)
    }
}

export function createReactQueryWrapper() {
	const testQueryClient = createTestQueryClient()
	// eslint-disable-next-line react/display-name, react/prop-types
	return ({ children }) => (
		<QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
	)
}