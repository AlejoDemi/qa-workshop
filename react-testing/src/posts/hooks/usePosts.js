import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export const usePosts = (options = {}) => {
	return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      // ideally, this should be in a separate function
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
      return data
    },
    ...options
  })
}