import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '@/providers/authContext';
import { Badge } from '@/components/ui/badge';
import {
	BookOpen,
	Clock,
	ListOrdered,
	Wallet,
	ChevronDown,
	ChevronRight,
} from 'lucide-react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import api from '@/services/api';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function CourseDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useUserContext();
	const [course, setCourse] = useState();
	// temporary fetch to fix dashboard
	// setCourse(location.state && location.state.course);

	const [openChapters, setOpenChapters] = useState({});
	const [requested, setRequested] = useState(false);

	useEffect(() => {
		const getCourse = async () => {
			try {
				const response = await api.get(`/courses/${id}`);
				const courseData = response.data;
				setCourse(courseData);
				const isCurrentlyRequested = (courseData.requested_students || []).some(
					(student) => student._id === user._id
				);
				console.log('isCurrentlyRequested:', isCurrentlyRequested);
				console.log('Course data fetched:', courseData);
				setRequested(isCurrentlyRequested);
			} catch (error) {
				console.error('Error fetching courses:', error);
				return [];
			}
		};
		getCourse();
	}, []);

	if (!course) {
		return (
			<div className="p-6 text-center">
				<p className="text-lg font-semibold">No course data found.</p>
				<button
					onClick={() => navigate(-1)}
					className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
				>
					Go Back
				</button>
			</div>
		);
	}

	const {
		name,
		goal,
		course_level,
		course_programs = [],
		tags = [],
		price,
		img_url,
	} = course;

	const totalLessons = course_programs.reduce((sum, chap) => {
		return sum + (Array.isArray(chap.lessons) ? chap.lessons.length : 0);
	}, 0);

	const toggleChapter = (idx) => {
		setOpenChapters((prev) => ({
			...prev,
			[idx]: !prev[idx],
		}));
	};

	const handleEnroll = async () => {
		try {
			await api.post(`/courses/${course._id}/enroll`);
			if (!requested) {
				toast.success('Request to enroll sent successfully!');
			} else {
				toast.success('Request to cancel enrollment sent successfully!');
			}
			setRequested(!requested);
		} catch (error) {
			if (error.response.status === 400) {
				toast.error('You have already had a class of this course.');
			}
			console.error('Error enrolling in course:', error);
			toast.error('Failed to send request. Please try again later.');
		}
	};

	return (
		<div className="w-full h-full bg-gray-50">
			<div className="w-full max-w-screen-2xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Left Side */}
				<div className="lg:col-span-2 space-y-6">
					{/* Course Image */}
					<div className="w-full h-64 overflow-hidden">
						<img
							src={img_url || '/placeholder-image.png'}
							alt={name}
							className="w-full h-full object-cover"
						/>
					</div>

					{/* Course Info */}
					<div>
						<h1 className="text-3xl font-bold mb-2">{name}</h1>
						<div className="flex flex-wrap gap-2 mb-4">
							<Badge className="uppercase text-xs tracking-wider text-purple-600 border-purple-600 bg-purple-50 w-fit">
								{course_level}
							</Badge>
							{tags.map((tag, idx) => (
								<Badge
									key={idx}
									className="uppercase text-xs tracking-wider text-purple-600 border-purple-600 bg-purple-50 w-fit"
								>
									{tag}
								</Badge>
							))}
						</div>
						<p className="text-gray-500 mb-4">{goal}</p>
					</div>

					{/* Description */}
					<div>
						<h2 className="text-2xl font-semibold mb-4">Description</h2>
						<p className="text-gray-600">{goal}</p>
					</div>

					{/* Course Contents */}
					<div>
						<h2 className="text-2xl font-semibold mb-4">Course Contents</h2>
						<div className="space-y-4">
							<Accordion type="multiple" className="space-y-4">
								{course_programs.map((chapter, idx) => (
									<AccordionItem
										key={idx}
										value={`item-${idx}`}
										className="border rounded-lg shadow bg-white"
									>
										<AccordionTrigger className="px-5 py-4 hover:bg-gray-50 text-lg font-semibold text-gray-800">
											<div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-2">
												<span>{chapter.title}</span>
												<p className="text-sm text-muted-foreground">
													{chapter.description}
												</p>
											</div>
										</AccordionTrigger>

										<AccordionContent className="px-6 pb-5">
											<div className="space-y-3">
												{chapter.lessons.map((lesson, lessonIndex) => {
													return (
														<Card
															key={lessonIndex}
															className={cn(
																'bg-gray-50 p-4 border border-gray-200 shadow-sm'
															)}
														>
															<div className="flex flex-col sm:flex-row sm:items-center justify-between">
																<div>
																	<h4 className="font-medium text-gray-800">
																		{lesson.title}
																	</h4>
																	<p className="text-sm text-gray-600 mt-1">
																		{`[${lesson.type}] `}
																		{lesson.description}
																	</p>
																</div>
															</div>
														</Card>
													);
												})}
											</div>
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>
					</div>
				</div>

				{/* Right Side */}
				<div className="space-y-4">
					<div className="bg-white p-4 pb-8 shadow-sm">
						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<Clock className="w-5 h-5 text-blue-600" />
								<span>
									Expected time: <strong>3 months</strong>
								</span>
							</div>
							<div className="flex items-center gap-3">
								<ListOrdered className="w-5 h-5 text-blue-600" />
								<span>
									Total chapters: <strong>{course_programs.length}</strong>
								</span>
							</div>
							<div className="flex items-center gap-3">
								<BookOpen className="w-5 h-5 text-blue-600" />
								<span>
									Total lessons: <strong>{totalLessons}</strong>
								</span>
							</div>
							<div className="flex items-center gap-3">
								<Wallet className="w-5 h-5 text-blue-600" />
								<span>
									Price: <strong>{price} VND</strong>
								</span>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col gap-4 w-full mt-4">
							<button
								onClick={() => navigate(-1)}
								className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 w-full max-w-[300px] m-auto"
							>
								Return
							</button>
							{user && user.role === 'student' && (
								<button
									onClick={handleEnroll}
									className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 w-full max-w-[300px] m-auto"
								>
									{!requested ? 'Request To Enroll' : 'Cancel Request'}
								</button>
							)}
							{user && user.role === 'manager' && (
								<>
									<button
										onClick={() =>
											navigate('/add-class', { state: { course } })
										}
										className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 w-full max-w-[300px] m-auto"
									>
										Add new class
									</button>
									<button
										onClick={() =>
											navigate(`/course/${course._id}/edit`, {
												state: { course },
											})
										}
										className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 w-full max-w-[300px] m-auto"
									>
										Edit Course
									</button>
								</>
							)}
						</div>
					</div>
					{user &&
						(user.role === 'manager' || user.role === 'staff') &&
						course.requested_students.length > 0 && (
							<div className="flex flex-col p-5 bg-white shadow-sm">
								<div className="mt-4 mb-4 text-center text-xl font-bold">
									Requested Students
								</div>
								{course.requested_students.map((student) => (
									<button
										key={student._id}
										onClick={() => navigate(`/users/${student._id}`)}
										className="flex items-center p-3 bg-white dark:bg-gray-800 border  hover:shadow-md transition-shadow duration-200 focus:outline-none"
									>
										<img
											src={student.avatar_url}
											alt={student.name}
											className="w-10 h-10 rounded-full object-cover"
										/>
										<span className="ml-3 text-gray-800 dark:text-gray-100 font-medium truncate">
											{student.name}
										</span>
									</button>
								))}
							</div>
						)}
				</div>
			</div>
		</div>
	);
}
