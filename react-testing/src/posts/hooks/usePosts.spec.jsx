import React from 'react'
import { describe, expect, test } from 'vitest'
import { createReactQueryWrapper, renderHook, server, waitFor } from '@/test'
import { usePosts } from './usePosts'
import { http, HttpResponse } from 'msw'
import { successResponse } from '../__mocks__'

describe('usePosts', () => {
	test('should retrieve posts', async () => {
		server.use(
			http.get('https://jsonplaceholder.typicode.com/posts', () => {
				return HttpResponse.json(successResponse)
			})
		)

		const { result } = renderHook(() => usePosts(), { wrapper: createReactQueryWrapper() })

		// wait until the query has transitioned to success state
		await waitFor(() => expect(result.current.isSuccess).toBe(true))
		
		expect(result.current.data).toEqual(successResponse)
	})

	// TODO tests for error/loading cases or unexpected data structure
})