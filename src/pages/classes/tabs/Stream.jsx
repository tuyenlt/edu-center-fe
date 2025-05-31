import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from '@/components/ui/card';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Copy, Maximize, CheckCheck, Users } from 'lucide-react';
import { useUserContext } from '@/providers/authContext';
import RichTextBox from '@/components/shared/RichTextBox';
import AvatarUser from '@/components/shared/AvatarUser';
import { Alert, AlertTitle } from '@/components/ui/alert';
import MagicInput from '@/components/shared/MagicInput';
import ClassPostItem from '../components/ClassPostItem';
import api from '@/services/api';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { useParams } from 'react-router-dom';
import { useWebSocket } from '@/providers/WebSocketProvider';
import { toast } from 'sonner';

export default function Stream() {
	const { classId } = useParams();
	const { user } = useUserContext();
	const isTeacher = user?.role === 'teacher';

	const [data, setData] = useState(null);
	const [isCopied, setIsCopied] = useState(false);
	const [isRichTextOpen, setIsRichTextOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [file, setFile] = useState([]);
	const [link, setLink] = useState([]);
	const { socket, onClassPostComment, onClassPostCreate, joinClassUpdate } =
		useWebSocket();
	const editorRef = useRef(null);

	useEffect(() => {
		api
			.get(`/classes/${classId}`, {
				params: {
					populate_fields: ["class_posts", "course"],
				},
			})
			.then((response) => {
				const classData = response.data;
				classData.class_posts.sort((a, b) => {
					return new Date(b.createdAt) - new Date(a.createdAt);
				});
				setData(classData);
				console.log("Class data fetched:", classData);
			})
			.catch((error) => {
				console.error("Error fetching class data:", error);
			});
	}, [classId]);

	useEffect(() => {
		if (!socket) return;
		joinClassUpdate(classId);

		const unsubscribePostCreate = onClassPostCreate((newPost) => {
			console.log("New class post received:", newPost);
			setData((prev) => {
				if (!prev) return prev;
				const updatedPosts = [...prev.class_posts, newPost];
				updatedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
				return { ...prev, class_posts: updatedPosts };
			});
		});

		const unsubscribePostComment = onClassPostComment((comment) => {
			setData((prev) => {
				if (!prev) return prev;
				const updatedPosts = prev.class_posts.map((post) => {
					if (post._id === comment.postId) {
						return {
							...post,
							comments: [...post.comments, comment],
						};
					}
					return post;
				});
				return { ...prev, class_posts: updatedPosts };
			});
		});

		return () => {
			unsubscribePostCreate();
			unsubscribePostComment();
		};
	}, [socket, classId]);

	if (!data)
		return (
			<div className="flex items-center justify-center h-50">
				<LoadingSpinner />
			</div>
		);

	const handleCopyCode = () => {
		setIsCopied(true);
		navigator.clipboard.writeText(data.class_code);
		setTimeout(() => setIsCopied(false), 2000);
	};

	const addPostHandler = async () => {
		try {
			const response = await api.post(`/class-posts`, {
				classId: data._id,
				title,
				content: editorRef.current.getHTML(),
				type: "announcement",
				attachments: file,
				links: link,
			});
			const createdPost = response.data;

			if (socket) {
				socket.emit("classPostCreate", { classId: data._id, post: createdPost });
			}

			setData((prev) => {
				const updatedPosts = [...prev.class_posts, createdPost];
				updatedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
				return { ...prev, class_posts: updatedPosts };
			});
			setTitle("");
			editorRef.current.clear();
			setFile([]);
			setLink([]);
			setIsRichTextOpen(false);

			toast.success("Announcement posted successfully!");
		} catch (error) {
			console.error("Error creating class post:", error);
			toast.error("Failed to post announcement.");
		}
	};

	const handleAddComment = (postId, commentText) => {
		if (!socket) return;
		socket.emit("classPostComment", {
			classId: data._id,
			classPostId: postId,
			comment: {
				postId,
				content: commentText,
				author: user._id,
			},
		});
	};

	return (
		<div>
			{isCopied && (
				<Alert className="fixed z-1000 bottom-5 left-5 w-50">
					<CheckCheck className="h-4 w-4" />
					<AlertTitle>Copied!</AlertTitle>
				</Alert>
			)}

			{/* Hero banner */}
			<Card
				className="w-full h-60 bg-cover bg-center relative overflow-hidden"
				style={{ backgroundImage: `url(${data.course.img_url})` }}
			>
				<div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
				<CardHeader className="absolute bottom-4 left-4 text-white w-full">
					<CardTitle className="text-4xl">{data.class_name}</CardTitle>
				</CardHeader>
			</Card>

			<div
				className={cn(
					'mt-6 grid gap-6',
					isTeacher ? 'grid-cols-5' : 'grid-cols-1'
				)}
			>
				{isTeacher && (
					<Card className="h-34">
						<CardHeader>
							<CardTitle>Class Code</CardTitle>
						</CardHeader>
						<CardContent className="flex items-center justify-between text-xl text-blue-600">
							<span>{data.class_code}</span>
							<Dialog>
								<DialogTrigger asChild>
									<Maximize className="cursor-pointer" />
								</DialogTrigger>
								<DialogContent className="sm:max-w-md">
									<DialogHeader>
										<DialogTitle>Class Code</DialogTitle>
									</DialogHeader>
									<p className="text-center text-6xl py-6">{data.class_code}</p>
									<div className="flex justify-between items-center">
										<span className="font-medium">
											{data.class_name.length <= 10
												? data.class_name
												: `${data.class_name.slice(0, 10)}...`}
										</span>
										<button
											onClick={handleCopyCode}
											className="flex items-center gap-2"
										>
											<Copy /> Copy
										</button>
									</div>
								</DialogContent>
							</Dialog>
						</CardContent>
					</Card>
				)}

				<div className="col-span-4 flex flex-col gap-6">
					{/* New announcement */}
					{isTeacher && (
						<Card className="shadow">
							<CardContent>
								{!isRichTextOpen ? (
									<div className="flex items-center gap-4">
										<AvatarUser user={user} className="w-12 h-12" />
										<button
											onClick={() => setIsRichTextOpen(true)}
											className="text-gray-500"
										>
											Create announcement...
										</button>
									</div>
								) : (
									<>
										<MagicInput
											placeholder="Title"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
										/>
										<RichTextBox
											ref={editorRef}
											placeholder="Content..."
											className="min-h-[200px] mt-2"
											file={file}
											setFile={setFile}
											link={link}
											setLink={setLink}
										/>
										<div className="mt-4 flex justify-end gap-4">
											<Button
												variant="none"
												onClick={() => setIsRichTextOpen(false)}
											>
												Cancel
											</Button>
											<Button onClick={addPostHandler}>Post</Button>
										</div>
									</>
								)}
							</CardContent>
						</Card>
					)}

					{/* Announcements list */}
					{data.class_posts.map((post) => (
						<ClassPostItem
							user={user}
							post={post}
							key={post._id}
							handleAddComment={handleAddComment}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
