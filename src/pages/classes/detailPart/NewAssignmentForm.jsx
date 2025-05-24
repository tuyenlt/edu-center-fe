import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from '@/components/ui/select';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, Link, ArrowLeft, X, UserRoundCog } from 'lucide-react';
import RichTextBox from '@/components/shared/RichTextBox';
import { useState, useRef, useEffect } from 'react';
import AvatarUser from '@/components/shared/AvatarUser';
import api from '@/services/api';
import { useParams } from 'react-router-dom';
import { useUserContext } from '@/providers/authContext';
import { Calendar } from '@/components/ui/calendar';

export default function NewAssignmentForm({ onClose, class_name, data }) {
  const [selectedAll, setSelectedAll] = useState(true);

  const [file, setFile] = useState([]);
  const [link, setLink] = useState([]);
  const editorRef = useRef(null);
  const [classList, setClassList] = useState([]);
  const { classDetailId } = useParams();
  const { user } = useUserContext();
  // const [date, setDate] = (useState < Date) | (undefined > new Date());

  useEffect(() => {
    const fetchClassList = async () => {
      try {
        const response = await api.get(`/classes-of-user/${user._id}`);
        setClassList(response.data);
      } catch (error) {
        console.error('Error fetching class data:', error);
      }
    };
    fetchClassList();
  }, []);
  if (classList.length !== 0) console.log(classList);
  return (
    <div className="fixed inset-0 bg-gray-50 z-50">
      <div className="w-4/5 mr-auto flex flex-col gap-6 p-6 pt-24">
        <div className="fixed top-0 left-0 w-full bg-white z-51 border-b px-6 h-16 flex items-center justify-between">
          <button onClick={onClose} type="button">
            <X />
          </button>
          <Button type="submit">Save</Button>
        </div>

        <div className="flex-1 p-6 space-y-6">
          <div className="bg-white dark:bg-gray-800 py-6 px-10 rounded-md shadow border ">
            <ArrowLeft
              onClick={onClose}
              className="absolute top-1 left-1"
            ></ArrowLeft>
            <Input placeholder="Title" className="mb-4 font-medium text-lg" />
            <RichTextBox
              placeholder="Description..."
              className="min-h-[300px]"
              ref={editorRef}
              file={file}
              setFile={setFile}
              link={link}
              setLink={setLink}
            />
          </div>
        </div>

        <div className="w-[300px] h-screen  border-l bg-white dark:bg-gray-800 p-6 space-y-4 shadow-md fixed right-0 top-15">
          <div>
            <Label className="text-sm text-gray-700 dark:text-gray-300">
              For which class
            </Label>
            <Select value={data.class_name}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {classList &&
                    classList.map((Class) => (
                      <SelectItem value={Class.class_name}>
                        {Class.class_name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm text-gray-700 dark:text-gray-300">
              For which students
            </Label>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="mt-1 w-full">
                  <UserRoundCog /> All students
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                  <DialogTitle>Assign for</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="all"
                      checked={selectedAll}
                      onCheckedChange={setSelectedAll}
                    />
                    <Label htmlFor="all" className="cursor-pointer">
                      All students
                    </Label>
                  </div>
                  {data.students.map((student, index) => {
                    return (
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={index}
                          // checked={selectedKirito}
                          // onCheckedChange={setSelectedKirito}
                        />
                        <Label
                          htmlFor={index}
                          className="cursor-pointer flex items-center gap-2"
                        >
                          <div className="w-6 h-6 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center font-medium">
                            <AvatarUser
                              className="w-6 h-6 border-0 text-white"
                              user={student}
                            />
                          </div>
                          {student.name}
                        </Label>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4">
                  <Button>Xong</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <Label className="text-sm text-gray-700 dark:text-gray-300">
              Grade
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="100" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="Không chấm điểm">No grade</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm text-gray-700 dark:text-gray-300">
              Due date
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="No due date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="custom">
                  <Calendar
                    mode="single"
                    // selected={date}
                    // onSelect={setDate}
                    className="rounded-md border shadow"
                  />
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm text-gray-700 dark:text-gray-300">
              Topic
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Không có chủ đề" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Không có chủ đề</SelectItem>
                <SelectItem value="topic1">Chủ đề 1</SelectItem>
                <SelectItem value="topic2">Chủ đề 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button variant="outline" className="w-full">
              + Tiêu chí chấm điểm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
