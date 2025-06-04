import AvatarUser from '@/components/shared/AvatarUser';
import { format } from 'date-fns';
import { Users } from 'lucide-react';
import { useState } from 'react';

export default function CommentList({ commentsParam }) {
	const [isAllCommentDisplay, setIsAllCommentDisplay] = useState(false);
	if (commentsParam.length == 0) return;
	const commentsToRender = isAllCommentDisplay
		? commentsParam
		: [commentsParam.at(-1)];
	console.log(commentsToRender);

	return (
		<>
			<button
				className="flex justify-start text-blue-500 font-semibold text-sm gap-2 items-center mr-auto"
				onClick={() => setIsAllCommentDisplay((prev) => !prev)}
			>
				<Users className="w-4 h-4 font-semibold text-blue-700" />
				<span>{`${commentsParam.length} comments`}</span>
			</button>
			{commentsToRender.map((c) => (
				<div key={c._id} className="flex items-center justify-between gap-3 w-full">
					<div className='flex gap-2 items-center'>
						<AvatarUser user={c.author} className="w-8 h-8" />
						<div>
							<p className="text-sm font-medium">{c.author.name}</p>
							<p className="text-sm text-gray-600">{c.content}</p>
						</div>
					</div>
					<div className='text-muted-foreground text-xs'>{format(c.createdAt, "hh:mm - dd/MM")}</div>
				</div>
			))}
		</>
	);
}
