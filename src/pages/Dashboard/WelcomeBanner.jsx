import { useEffect, useState } from 'react';
import { welcomeMessages } from './data';

export default function WelcomeBanner({ user }) {
	const [welcome, setWelcome] = useState();
	const isManager = user?.role === 'manager';
	const isTeacher = user?.role === 'teacher';
	const isStudent = user?.role === 'student';
	useEffect(() => {
		setWelcome(
			welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]
		);
	}, []);

	return (
		<div className="bg-[#0146ab] text-white rounded-2xl flex flex-col md:flex-row justify-between items-center">
			<div className="p-6">
				<h1 className="text-2xl font-bold mb-2 ">Welcome back, {user.name}</h1>
				<p className="max-w-[532px] text-base">
					{isStudent
						? welcome
						: isManager
							? 'Welcome back, Manager! Monitor student progress, manage billing and schedules, and ensure everything runs smoothly across your system.'
							: 'Hello, Teacher! Ready to guide, inspire, and evaluate your students? Dive into your classes and keep making a difference every day.'}
				</p>
			</div>
			<img src="/images/image.png" alt="Welcome" className="h-[176px] block" />
		</div>
	);
}
