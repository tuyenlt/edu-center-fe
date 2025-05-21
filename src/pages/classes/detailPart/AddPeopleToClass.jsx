import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const students = [
  {
    name: 'Thảo NT',
    email: 'thaontp.ioit@gmail.com',
    avatar: null,
  },
  {
    name: 'Huệ NT',
    email: 'huenth@ptit.edu.vn',
    avatar: null,
  },
  {
    name: 'Khánh Vân',
    email: 'khanhvanduongbach@gmail.com',
    avatar: 'https://i.pravatar.cc/100?img=52',
  },
];

export default function AddPeopleToClass() {
  const [input, setInput] = useState('');

  return (
    <>
      <h2 className="text-lg font-semibold">Mời học viên</h2>

      <div className="text-sm text-gray-500">
        Đường liên kết mời:
        <div className="text-blue-600 truncate">
          https://classroom.google.com/c/NzgzOTc30DEyNTA3?cjc=awq...
        </div>
      </div>

      <Input
        placeholder="Nhập tên hoặc email"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <ScrollArea className="max-h-[200px] space-y-2">
        {students.map((student, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer"
          >
            <Avatar>
              {student.avatar ? (
                <AvatarImage src={student.avatar} />
              ) : (
                <AvatarFallback>
                  {student.name.charAt(0).toLowerCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <div className="text-sm font-medium">{student.email}</div>
              <div className="text-xs text-gray-500">{student.email}</div>
            </div>
          </div>
        ))}
      </ScrollArea>

      <div className="flex justify-end gap-2">
        <Button variant="ghost">Hủy</Button>
        <Button>Mời</Button>
      </div>
    </>
  );
}
