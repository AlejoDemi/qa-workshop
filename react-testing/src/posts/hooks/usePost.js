import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export const usePost = (id, options = {}) => {
	return useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      // ideally, this should be in a separate function
			const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      return data
    },
		...options,
		enabled: (options.enabled ?? true) && !!id
  })
}