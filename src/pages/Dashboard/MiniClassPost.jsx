import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '@/services/api';
import { useUserContext } from '@/providers/authContext';

import ClassPost from './ClassPost';

export default function MiniClassPost({ classes }) {
	const [data, setData] = useState([]);
	const { user } = useUserContext();

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const responses = await Promise.all(
					classes.map((cls) =>
						api
							.get(`/classes/${cls._id}`, {
								params: {
									populate_fields: ['class_posts'],
								},
							})
							.then((res) => {
								const posts = res.data.class_posts || [];
								if (posts.length === 0) return null;

								const latestPost = posts.sort(
									(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
								)[0];
								
								return {
									post: latestPost,
									class_name: cls.class_name,
									class_code: cls.class_code,
									classId: cls._id,
								};
							})
					)
				);

				const validPosts = responses.filter(Boolean); // remove nulls
				setData(validPosts);
			} catch (error) {
				console.error('Error fetching class posts:', error);
			}
		};

		if (classes?.length) fetchPosts();
	}, [classes]);

	return (
		<div className="bg-white p-4 rounded-lg shadow-md overflow-y-scroll h-[396px]">
			<div className="flex justify-between mb-4">
				<h2 className="font-semibold text-lg">Class Notifications</h2>
				<Link to="/" className="text-blue-700 text-sm font-medium">
					See all
				</Link>
			</div>

			{data.map((d) => (
				<ClassPost
					key={d.post._id}
					post={d.post}
					classData={d}
				/>
			))}
		</div>
	);
}
