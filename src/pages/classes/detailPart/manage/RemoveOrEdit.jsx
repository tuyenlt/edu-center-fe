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
export default function RemoveOrEdit({ role, name }) {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenRemove, setIsOpenRemove] = useState(false);
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
              setTimeout(() => setIsOpenEdit(true), 10);
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-md transition-colors"
          >
            <Pencil className="w-4 h-4" />
            <span>Edit</span>
          </DropdownMenuItem>

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

      <Dialog open={isOpenEdit} onOpenChange={setIsOpenEdit}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit {role}</DialogTitle>
            <DialogDescription>
              Make changes to the user's information. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between items-center">
            <span className="font-medium">{name}</span>
          </div>
          <DialogFooter>
            <button
              onClick={() => setIsOpenRemove(false)}
              className="px-4 py-2 rounded-md hover:bg-blue-100"
            >
              Cancel
            </button>
            <Button>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isOpenRemove} onOpenChange={setIsOpenRemove}>
        <DialogContent className="sm:max-w-md flex flex-col gap-5">
          <DialogHeader>
            <DialogTitle>Remove {role.toUpperCase()}?</DialogTitle>
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
            <Button>Remove</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
