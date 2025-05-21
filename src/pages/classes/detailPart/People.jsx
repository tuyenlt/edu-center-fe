import { people } from '../data';
import AddPeopleToClass from './AddPeopleToClass';
import { TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { UserRoundPlus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
export default function People() {
  const hasStudent = people.filter((person) => person.position === 'Student');
  return (
    <TabsContent value="people" className="w-4/5 mx-auto  mt-5 pt-20">
      <div className="flex justify-between items-center border border-neutral-200 border-t-0 border-x-0 pl-5 pr-5">
        <h2 className="text-3xl font-medium pt-5 pb-5 ">Teacher</h2>
        <div className="flex justify-between w-30">
          <span>2 teachers</span>

          <Dialog>
            <DialogTrigger asChild>
              <UserRoundPlus />
            </DialogTrigger>
            <DialogContent>
              <AddPeopleToClass></AddPeopleToClass>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <ul className="mt-10">
        {people
          .filter((person) => person.position === 'Teacher')
          .map((person) => (
            <li
              key={person.id}
              className="pb-3 pt-3  pl-5 border border-neutral-200 border-t-0 border-x-0"
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>{person.name}</span>
              </div>
            </li>
          ))}
      </ul>
      <div className="flex justify-between items-center border border-neutral-200 border-t-0 border-x-0 pl-5 pr-5">
        <h2 className="text-3xl font-medium pt-5 pb-5 ">Student</h2>
        <div className="flex justify-between w-30">
          <span>2 teachers</span>
          <Dialog>
            <DialogTrigger asChild>
              <UserRoundPlus />
            </DialogTrigger>
            <DialogContent>
              <AddPeopleToClass></AddPeopleToClass>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {hasStudent.length > 0 ? (
        <ul className="mt-10">
          {hasStudent.map((person) => (
            <li
              key={person.id}
              className="pb-3 pt-3 border pl-5 border-neutral-200 border-t-0 border-x-0"
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>{person.name}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10"> Add some motherfucker student</p>
      )}
    </TabsContent>
  );
}
