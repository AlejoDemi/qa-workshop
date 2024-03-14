import React from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { usePost } from './hooks'
import { ArrowBigLeftIcon, Share2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

export const Post = () => {
	const { postId } = useParams()
	const { pathname } = useLocation()
	const { status, data = {}, error } = usePost(postId)

	const { title, body } = data

	const { toast } = useToast()

	const handleCopy = () => {
		navigator.clipboard.writeText(`${location.origin}${pathname}`)
			.then(() => {
				toast({ title: 'Copied!' })
			})
	}

	return (
		<>
			<div className='flex items-center'>
				<Link to='/posts' className='flex items-center'>
					<ArrowBigLeftIcon />
					<span>Return to posts</span>
				</Link>

				<Button variant='outline' size='icon' className='ml-12 cursor-pointer'>
					<Share2Icon onClick={handleCopy} />
				</Button>
			</div>
			<div>
			{status === 'pending' ? (
          'Loading...'
        ) : status === 'error' ? (
          <span>Error: {error.message}</span>
        ) : (
					<div>
						<h4 className='text-lg font-semibold mb-2 text-center'>{title}</h4>
						<p className='text-lg'>{body}</p>
					</div>
        )}
			</div>
		</>
	)
}
