import api from "@/services/api";
import { dateTimeConvert_2 } from "@/utils/dateTimeConvert";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserNotifies({ user }) {
	const navigate = useNavigate();
	const [notifies, setNotifies] = useState([]);

	useEffect(() => {
		api.get(`/users/${user._id}/notifies`)
			.then((response) => {
				const sortedNotifies = response.data.sort((a, b) => new Date(b.notify.updatedAt) - new Date(a.notify.updatedAt));
				setNotifies(sortedNotifies);
			}).catch((error) => {
				console.error("Error fetching user notifies:", error);
			}).finally(() => {
				console.log("User notifies fetched:", notifies);
			})
	}, [user])

	const handleNotifyRead = (notifyId, link) => {
		navigate(link);
	}

	return (
		<div>
			{notifies.length > 0 ? (
				notifies.map((notifyItem) => (
					<div
						key={notifyItem.notify._id}
						className="flex justify-between items-center border-b border-gray-200 py-4 px-2 cursor-pointer"
						onClick={() => handleNotifyRead(notifyItem.notify._id, notifyItem.notify.link)}
					>
						<div className="flex flex-col">
							<span className="font-semibold">{notifyItem.notify.title}</span>
							<span className="text-gray-500">{notifyItem.notify.content}</span>
						</div>
						<div className="text-gray-400 text-sm">
							{dateTimeConvert_2(notifyItem.notify.updatedAt)}
						</div>
					</div>
				))
			) : (
				<div className="text-center text-gray-500 py-10">
					No notifications found.
				</div>
			)}
		</div>
	)
}