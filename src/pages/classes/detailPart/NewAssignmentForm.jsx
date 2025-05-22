import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Upload, Link, ArrowLeft } from 'lucide-react';
import RichTextBox from '@/components/shared/RichTextBox';
import { useState, useRef } from 'react';

export default function NewAssignmentForm({ onClose, class_name }) {
  const [file, setFile] = useState([]);
  const [link, setLink] = useState([]);
  const editorRef = useRef(null);

  return (
    <div className="flex w-full h-screen bg-gray-50 dark:bg-gray-900 relative">
      {/* Left side */}
      <div className="flex-1 p-6 space-y-6">
        <div className="bg-white dark:bg-gray-800 py-6 px-10 rounded-md shadow border ">
          <ArrowLeft
            onClick={onClose}
            className="absolute top-1 left-1"
          ></ArrowLeft>
          <Input placeholder="Tiêu đề" className="mb-4 font-medium text-lg" />
          <RichTextBox
            placeholder="Description..."
            className="min-h-[300px]"
            ref={editorRef}
            file={file}
            setFile={setFile}
            link={link}
            setLink={setLink}
          />

          {/* Toolbar */}
        </div>

        {/* Đính kèm */}
      </div>

      {/* Right panel */}
      <div className="w-[300px] border-l bg-white dark:bg-gray-800 p-6 space-y-4 shadow-md">
        <div>
          <Label className="text-sm text-gray-700 dark:text-gray-300">
            Assignment for
          </Label>
          <Input disabled value={class_name} className="mt-1" />
        </div>
        <div>
          <Label className="text-sm text-gray-700 dark:text-gray-300">
            Giao cho
          </Label>
          <Button variant="outline" className="mt-1 w-full">
            👥 Tất cả học viên
          </Button>
        </div>
        <div>
          <Label className="text-sm text-gray-700 dark:text-gray-300">
            Điểm
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="100" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="100">100</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="Không chấm điểm">Không chấm điểm</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm text-gray-700 dark:text-gray-300">
            Hạn nộp
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Không có ngày đến hạn" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Không có ngày đến hạn</SelectItem>
              <SelectItem value="custom">Chọn ngày</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm text-gray-700 dark:text-gray-300">
            Chủ đề
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
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => {
            console.log(editorRef?.current?.getHTML());
            console.log(link);
            console.log(file);
          }}
          type="button"
        >
          Giao bài
        </Button>
      </div>
    </div>
  );
}
