import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { CircleX, EllipsisVertical, Pencil, UserRoundPlus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import api from '@/services/api';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
export default function RemoveOrEdit({ user }) {

  const { classId } = useParams();
  const [isOpenRemove, setIsOpenRemove] = useState(false);
  const { name, role } = user;


  const handleRemoveUser = async () => {
    try {
      await api.delete(`/classes/${classId}/remove-user`, {
        params: {
          user_id: user._id,
        },
      });
      toast.success(`${role} ${name} has been removed successfully.`);
      setIsOpenRemove(false);
    } catch (error) {
      setIsOpenRemove(false);
      console.error('Error removing user:', error);
      toast.error(`Failed to remove ${role} ${name}.`, {
        description: error.response?.data?.message || 'Please try again later.',
      });
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
            <EllipsisVertical className="w-5 h-5 text-gray-600" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 rounded-md shadow-lg border p-1">
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setTimeout(() => setIsOpenRemove(true), 10);
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer rounded-md transition-colors"
          >
            <CircleX className="w-4 h-4 text-red-600" />
            <span>Remove {role}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>


      <Dialog open={isOpenRemove} onOpenChange={setIsOpenRemove}>
        <DialogContent className="sm:max-w-md flex flex-col gap-5">
          <DialogHeader>
            <DialogTitle>Remove {role}?</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this {role}?
            </DialogDescription>
          </DialogHeader>
          <p className="font-medium text-center text-red-500">{name}</p>
          <DialogFooter className="">
            <button
              onClick={() => setIsOpenRemove(false)}
              className="px-4 py-2 rounded-md hover:bg-blue-100"
            >
              Cancel
            </button>
            <Button onClick={handleRemoveUser}>Remove</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
