import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  PlusCircle,
  Upload,
  Link,
  Youtube,
  FileText,
  FolderOpen,
  ArrowLeft,
} from 'lucide-react';

export default function NewAssignmentForm({ onClose }) {
  return (
    <div className="flex w-full h-screen bg-gray-50 dark:bg-gray-900 relative">
      {/* Left side */}
      <div className="flex-1 p-6 space-y-6">
        <div className="bg-white dark:bg-gray-800 py-6 px-10 rounded-md shadow border ">
          <ArrowLeft onClick={onClose} className="absolute top-1 left-1">
            x
          </ArrowLeft>
          <Input placeholder="Tiêu đề" className="mb-4 font-medium text-lg" />
          <Textarea
            placeholder="Hướng dẫn (không bắt buộc)"
            className="mb-4 h-32"
          />

          {/* Toolbar */}
        </div>

        {/* Đính kèm */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow border">
          <Label className="block mb-4 text-md font-medium">Đính kèm</Label>
          <div className="flex gap-6">
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1"
            >
              <Upload className="w-6 h-6" /> Tải lên
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1"
            >
              <Link className="w-6 h-6" /> Đường liên kết
            </Button>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-[300px] border-l bg-white dark:bg-gray-800 p-6 space-y-4 shadow-md">
        <div>
          <Label className="text-sm text-gray-700 dark:text-gray-300">
            Dành cho
          </Label>
          <Input disabled value="DCMDTD Section2" className="mt-1" />
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
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Giao bài
        </Button>
      </div>
    </div>
  );
}
