import React from 'react'
import { Link } from 'react-router-dom'
import { usePosts } from './hooks'
import { ScrollTextIcon } from 'lucide-react'

export const Posts = () => {
	const { status, data, error } = usePosts()

	return (
		<div>
      {status === 'pending' ? (
        'Loading...'
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <div className='flex flex-col items-center gap-2'>
          {data.map((post) => (
            <Link
              key={post.id}
              to={`${post.id}`}
              // hocus = focus + hover 🤓
              className='flex items-center gap-3 hocus:bg-indigo-500 p-2 rounded-md'
            >
              <ScrollTextIcon />
              <span>{post.title}</span>
            </Link>
          ))}
        </div>
      )}
		</div>
	)
}
