import AddPeopleToClass from './AddPeopleToClass';
import { TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { UserRoundPlus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
export default function People({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return <div>Loading...</div>;
  }
  const teachers = data.teachers;
  const students = data.students;
  return (
    <TabsContent value="people" className="w-4/5 mx-auto mt-5 pt-20 space-y-12">
      {/* TEACHERS SECTION */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-2xl font-bold text-gray-800">Teachers</h2>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {teachers.length} teachers
            </span>
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-2 rounded-full hover:bg-gray-100 transition">
                  <UserRoundPlus size={20} />
                </button>
              </DialogTrigger>
              <DialogContent>
                <AddPeopleToClass />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <ul className="divide-y divide-gray-200">
          {teachers.map((teacher) => (
            <li
              key={teacher.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition rounded-md"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={teacher.avatar || 'https://github.com/shadcn.png'}
                    alt={teacher.name}
                  />
                  <AvatarFallback>
                    {teacher.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-medium text-gray-800">
                    {teacher.name}
                  </p>
                  <p className="text-sm text-gray-500">{teacher.email}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* STUDENTS SECTION */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-2xl font-bold text-gray-800">Students</h2>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
              {students.length} students
            </span>
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-2 rounded-full hover:bg-gray-100 transition">
                  <UserRoundPlus size={20} />
                </button>
              </DialogTrigger>
              <DialogContent>
                <AddPeopleToClass />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {students.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {students.map((student) => (
              <li
                key={student.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition rounded-md"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={student.avatar || 'https://github.com/shadcn.png'}
                      alt={student.name}
                    />
                    <AvatarFallback>
                      {student.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-base font-medium text-gray-800">
                      {student.name}
                    </p>
                    <p className="text-sm text-gray-500">{student.email}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">
            No students yet. Add someone 👇
          </p>
        )}
      </section>
    </TabsContent>
  );
}
