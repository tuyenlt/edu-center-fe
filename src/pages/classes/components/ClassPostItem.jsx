
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
import AvatarUser from "@/components/shared/AvatarUser"
import { convertUTC, dateTimeConvert_2 } from "@/utils/dateTimeConvert"
import CommentList from "./CommentList"
import Comment from "./Comment"
import { useNavigate } from "react-router-dom"

export default function ClassPostItem({ post, handleAddComment, user }) {
	const navigate = useNavigate();
	const isAssignment = post.type === "assignment";
	const handleHeaderClick = () => {
		if (!isAssignment) return;
		navigate(`/assignments/${post.assignment._id}`);
	}

	return (
		<Card key={post._id}>
			<CardHeader className={`flex items-center gap-4 w-full ${isAssignment && 'cursor-pointer'}`} onClick={handleHeaderClick}>
				<AvatarUser user={post.author} className="w-12 h-12" />
				<div className="max-w-[calc(100%-300px)]">
					<CardTitle>
						{post.author.name} {post.type === "assignment" ? "Create New Assignment:" : "-"} {post.title}
					</CardTitle>
					<CardDescription className="text-xs text-gray-500 m-1">
						{convertUTC(post.createdAt)}
					</CardDescription>
				</div>
				{isAssignment && (
					<CardDescription className="text-sm text-gray-500 m-1 grow text-end">
						Due date : {dateTimeConvert_2(post.assignment.due_date)}
					</CardDescription>
				)}
			</CardHeader>
			<CardContent className={`text-gray-800 ml-0 border-b pb-5 ${isAssignment && 'cursor-pointer'}`} onClick={handleHeaderClick}>
				<div
					className=""
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>
				<div className="mt-3 flex flex-wrap gap-3">
					{post.links?.map((link, index) => (
						<LinkPreview url={link} key={index} className="" />
					))}
				</div>
			</CardContent>
			<CardFooter className="flex flex-col gap-5 ">
				<CommentList commentsParam={post.comments} />

				<div className="flex items-center gap-3 w-full">
					<AvatarUser user={user} className="w-8 h-8" />
					<Comment postId={post._id} onSubmit={handleAddComment} />
				</div>
			</CardFooter>
		</Card>
	)
}