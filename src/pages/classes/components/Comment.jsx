import { Input } from '@/components/ui/input';
import { SendHorizonal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import MagicInput from '@/components/shared/MagicInput';

export default function Comment({ postId, onSubmit }) {
	const [comment, setComment] = useState('');

	const isCommentEmpty = comment.trim() === '';

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!isCommentEmpty) {
			onSubmit(postId, comment);
			setComment('');
		}
	};

	return (
		<form className="flex w-full gap-x-3" onSubmit={handleSubmit}>
			<MagicInput
				placeholder="Write a comment..."
				value={comment}
				onChange={(e) => setComment(e.target.value)}
			/>
			<button
				type="submit"
				disabled={isCommentEmpty}
				className={cn(
					'transition-colors',
					isCommentEmpty
						? 'text-gray-300 cursor-not-allowed'
						: 'text-primary hover:text-primary/80'
				)}
			>
				<SendHorizonal />
			</button>
		</form>
	);
}
