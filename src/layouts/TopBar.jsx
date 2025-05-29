import { useUserContext } from '@/providers/authContext';
import LogoSVG from '@/assets/LogoSVG';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import api from '@/services/api';
import AvatarUser from '@/components/shared/AvatarUser';
export default function TopBar() {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const handleStudentContacting = async () => {
    try {
      if (!user) {
        return;
      }
      const response = await api.post('/chatrooms', {
        type: 'contact',
        name: `${user.name} Contacting`,
      });
      const chatRoomId = response.data._id;
      navigate(`/chat`, { state: { chatId: chatRoomId } });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-15 bg-white border-b flex flex-row items-center justify-between px-6 dark:bg-gray-900 dark:border-gray-700">
      {/* Logo */}
      <a href="/home" className="flex gap-2 items-center">
        <LogoSVG />
        <h1 className="text-2xl font-medium">EnglishNest</h1>
      </a>

      {/* User section */}
      <div className="flex items-center gap-4">
        {user?.role === 'student' && (
          <Button onClick={handleStudentContacting}>Contact Us</Button>
        )}
        <AvatarUser
          user={user}
          className="w-10 h-10"
          fallbackTextClass="text-md"
        />
        {/* <span className="text-md font-medium hidden md:block">
          {user?.name}
        </span> */}
      </div>
    </header>
  );
}
