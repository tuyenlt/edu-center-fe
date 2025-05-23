import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import AvatarUser from '@/components/shared/AvatarUser';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogClose } from '@radix-ui/react-dialog';
import api from '@/services/api';

export default function AddPeopleToClass({ type, courseId, classId, onSubmit }) {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response;
        if (type === 'student') {
          response = await api.get(`/courses/${courseId}/requested-students`);
        } else if (type === 'teacher') {
          response = await api.get(`/users/list?role=teacher`);
        }
        setUsers(response.data);
      } catch (error) {
        console.error(`Error fetching ${type}s:`, error);
      }
    };

    if (type === 'student' || type === 'teacher') {
      fetchUsers();
    }
  }, [type, courseId]);

  const toggleSelect = (userId) => {
    if (type === 'teacher') {
      setSelectedUsers(prev =>
        prev[0] === userId ? [] : [userId]
      );
    } else {
      // multi‐select logic for students
      setSelectedUsers(prev =>
        prev.includes(userId)
          ? prev.filter(id => id !== userId)
          : [...prev, userId]
      );
    }
  };

  const handleAddClick = () => {
    const payload =
      type === 'student'
        ? { students: selectedUsers }
        : { teacher_id: selectedUsers };
    const endpoint =
      type === 'student'
        ? `/classes/${classId}/add-students`
        : `/classes/${classId}/add-teacher`;

    api.post(endpoint, payload)
      .then(() => {
        setSelectedUsers([]);
        console.log(`${type === 'student' ? 'Students' : 'Teacher'} added successfully`);
        if (onSubmit) {
          onSubmit();
        }
      })
      .catch(console.error);
  };

  return (
    <>
      <h2 className="text-lg font-semibold">
        {type === 'student' ? 'Add Students' : 'Add Teacher'}
      </h2>

      <Input
        placeholder="Enter name or email"
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      <ScrollArea className="max-h-[200px] space-y-2 my-2">
        {type === 'student' && (
          <div className="text-center text-muted-foreground m-2">
            Students requested for this course
          </div>
        )}

        {users.map((user, idx) => (
          <label
            key={user._id ?? idx}
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer"
          >
            <Checkbox
              className="flex-shrink-0"
              checked={selectedUsers.includes(user._id)}
              onCheckedChange={() => toggleSelect(user._id)}
            />

            <AvatarUser user={user} />

            <div className="flex flex-col">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs text-gray-500">{user.email}</span>
            </div>
          </label>
        ))}
      </ScrollArea>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="ghost" onClick={() => setSelectedUsers([])}>
          Deselect
        </Button>
        <DialogClose asChild>
          <Button onClick={handleAddClick}>Add</Button>
        </DialogClose>
      </div>
    </>
  );
}
