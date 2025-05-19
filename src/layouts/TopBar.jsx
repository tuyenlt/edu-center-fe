import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserContext } from '@/providers/authContext';
import { useLocation } from 'react-router-dom';
import LogoSVG from '@/assets/LogoSVG';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
export default function TopBar() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const location = useLocation();

  const [createForm, setCreateForm] = useState({
    name: '',
    section: '',
    topic: '',
    room: '',
  });
  const [classCode, setClassCode] = useState('');
  const handleChangeJoinForm = (e) => {
    setClassCode(e.target.value);
  };
  const handleChangeCreateForm = (e) => {
    setCreateForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleJoinClass = () => {
    console.log(classCode);
  };
  const handleCreateForm = () => {
    console.log(createForm);
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
        {location.pathname.slice(-6) === '/class' &&
          user?.role === 'student' && (
            <Dialog>
              <DialogTrigger asChild>
                <Plus></Plus>
              </DialogTrigger>
              <DialogContent className="sm:max-w-1/3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleJoinClass();
                  }}
                >
                  <DialogHeader>
                    <DialogTitle>Join a class</DialogTitle>
                    <DialogDescription>
                      Ask your teacher for a 5-digit code and enter it below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="code"
                        className="text-right text-lg whitespace-nowrap"
                      >
                        Class code
                      </Label>
                      <Input
                        id="code"
                        name="code"
                        value={classCode}
                        // value="abc"
                        placeholder="Enter code..."
                        className="col-span-3"
                        onChange={handleChangeJoinForm}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <button
                      type="submit"
                      className="bg-inherit text-blue-600 font-medium"
                    >
                      Join class
                    </button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        {location.pathname.slice(-6) === '/class' &&
          user?.role === 'teacher' && (
            <Dialog onSubmit={handleCreateForm}>
              <DialogTrigger asChild>
                <Plus></Plus>
              </DialogTrigger>
              <DialogContent className="sm:max-w-1/3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateForm();
                  }}
                >
                  <DialogHeader>
                    <DialogTitle>Create a class</DialogTitle>
                    <DialogDescription>
                      Class name is required, while others is optional.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <input
                      id="name"
                      name="name"
                      value={createForm.name}
                      placeholder="Class name (required)"
                      className="col-span-3"
                      onChange={handleChangeCreateForm}
                    />

                    <input
                      id="section"
                      name="section"
                      value={createForm.section}
                      placeholder="Section"
                      className="col-span-3"
                      onChange={handleChangeCreateForm}
                    />

                    <input
                      id="topic"
                      name="topic"
                      value={createForm.topic}
                      placeholder="Topic"
                      className="col-span-3"
                      onChange={handleChangeCreateForm}
                    />

                    <input
                      id="room"
                      name="room"
                      value={createForm.room}
                      placeholder="Room"
                      className="col-span-3"
                      onChange={handleChangeCreateForm}
                    />
                  </div>
                  <DialogFooter>
                    <button
                      type="submit"
                      className="bg-inherit text-blue-600 font-medium"
                    >
                      Create
                    </button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        <Avatar
          className="w-10 h-10 p-1 bg-[rgba(60,64,67,.08)] rounded-full border-gray-200 dark:border-gray-700 cursor-pointer circle"
          onClick={() => navigate(`/users/${user?._id}`)}
        >
          {user?.avatar_url ? (
            <AvatarImage
              className="rounded-full"
              src={user.avatar_url}
              alt={user.name}
            />
          ) : (
            <AvatarFallback>{user?.name[0] || 'a'}</AvatarFallback>
          )}
        </Avatar>
        {/* <span className="text-md font-medium hidden md:block">
          {user?.name}
        </span> */}
      </div>
    </header>
  );
}
