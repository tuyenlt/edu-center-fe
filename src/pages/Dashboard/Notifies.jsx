import { useUserContext } from '@/providers/authContext';
import api from '@/services/api';
import { dateTimeConvert_2 } from '@/utils/dateTimeConvert';
import { Bell, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Notifies() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [notifies, setNotifies] = useState([]);

  useEffect(() => {
    api
      .get(`/users/${user._id}/notifies`)
      .then((response) => {
        const sortedNotifies = response.data.sort(
          (a, b) => new Date(b.notify.updatedAt) - new Date(a.notify.updatedAt)
        );
        setNotifies(sortedNotifies);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user notifies:', error);
      })
      .finally(() => {
        console.log('User notifies fetched:', notifies);
      });
  }, [user]);

  const handleNotifyRead = (notifyId, link) => {
    navigate(link);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-y-auto h-[396px]">
      <h2 className="mb-4 font-semibold text-lg">Notifications</h2>
      {notifies.length > 0 ? (
        notifies.map((notifyItem) => (
          <div
            key={notifyItem.notify._id}
            className="flex justify-between  border-b border-gray-200 py-4 px-2 cursor-pointer items-start"
            onClick={() =>
              handleNotifyRead(notifyItem.notify._id, notifyItem.notify.link)
            }
          >
            <div className="flex flex-col max-w-[215px]">
              <div className="flex items-start">
                <p className="font-semibold text-blue-900">
                  {notifyItem.notify.title}
                </p>
                {notifyItem.notify.title.split(' ').at(-1) === 'message' ? (
                  <MessageSquare className="w-5 h-5 text-blue-600 mt-1" />
                ) : (
                  <Bell className=" text-blue-600" size={32} />
                )}
              </div>
              <span className="text-gray-500 text-sm">
                {notifyItem.notify.content}
              </span>
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
  );
}
