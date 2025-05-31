import { useUserContext } from "@/providers/authContext";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function CourseRegistered() {
	const { user } = useUserContext();
	const [classes, setClasses] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		api.get(`/students/${user?._id}/requested-courses`)
			.then((response) => {
				setClasses(response.data);
			}).catch((error) => {
				console.error("Error fetching classes:", error);
			});
	}, [user]);

	if (!classes || classes.length === 0) {
		return (
			<div className="bg-white p-4 rounded-lg shadow-md h-[396px]">
				<h2 className="mb-4 font-semibold text-lg">Course Registered</h2>
				<div className=" flex items-center justify-center">
					<p className="text-gray-500">You haven't register for a course.</p>
				</div>
			</div>
		);
	}

	const approvedClasses = classes.filter((cls) => cls.status === 'approved');
	const pendingClasses = classes.filter((cls) => cls.status === 'pending');

	const sortedClasses = [...approvedClasses, ...pendingClasses];

	return (
		<div className=" bg-white p-4 rounded-lg shadow-md overflow-auto h-[396px] ">
			<h2 className="mb-4 font-semibold text-lg">Course Registered</h2>
			<div className="space-y-4">
				{sortedClasses.map((cls) => (
					<div
						key={cls.id}
						className={`p-4 rounded-lg border bg-blue-50 ${cls.status === 'approved' && 'border-blue-200 hover:bg-blue-100 cursor-pointer'}`}
						onClick={() => {
							if (cls.status === 'approved') {
								navigate(`/class/${cls.classId}`);
							}
						}}
					>
						<h3 className="text-base font-semibold text-gray-800">
							{cls.name}
						</h3>
						<p className="text-sm text-gray-600">
							Status:
							<span
								className={`ml-1 font-medium ${cls.status === 'approved'
									? 'text-green-600'
									: 'text-yellow-600'
									}`}
							>
								{cls.status}
							</span>
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
