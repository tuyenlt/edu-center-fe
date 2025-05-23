import { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import {
  EllipsisVertical,
  Pencil,
  ClipboardCheck,
  ClipboardList,
  HelpCircle,
  BookMarked,
  Repeat,
  FolderOpen,
  FileIcon,
  FileText,
  LinkIcon,
  Youtube,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserContext } from '@/providers/authContext';
export default function Assignment({ setIsNewAssignmentOpen, data }) {
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const { user } = useUserContext();
  const isStudent = user?.role === 'student';
  const isTeacher = user?.role === 'teacher';
  const isManager = user?.role === 'manager';
  const Content = (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <Card
          className="hover:bg-neutral-200 hover:cursor-pointer w-full py-0 gap-0"
          asChild
        >
          <AccordionTrigger className="relative [&>svg]:hidden">
            {/* choc vao phan tu cua radixui */}
            {/* absolute  [&>svg]:top-12  [&>svg]:right-6 [&>svg]:w-6  [&>svg]:h-6 */}
            <CardHeader className="w-full">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Bài kiểm tra chương 2</CardTitle>
                  <CardDescription className="mt-2 no-underline">
                    28 tháng 3
                  </CardDescription>
                </div>
                {isTeacher && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuItem onClick={() => setIsEditMenuOpen(true)}>
                        <Pencil className="mr-2 h-5 w-5" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ClipboardCheck className="mr-2 h-5 w-5" />
                        <span>Delete Assignment</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </CardHeader>
          </AccordionTrigger>
          <AccordionContent className="border-t pb-0">
            <CardContent className="w-full mx-autoborder shadow-sm p-4 bg-white space-y-4">
              <div className="text-sm text-muted-foreground">
                Đã đăng vào 19 thg 5 (Đã chỉnh sửa Hôm qua)
              </div>

              <h2 className="text-lg font-semibold">
                Review what you learn from DTD
              </h2>

              {/* File attachments */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <LinkIcon className="w-4 h-4" />
                <span className="text-sm truncate">Just a moment...</span>

                <Youtube className="w-4 h-4 text-red-500" />
                <span className="text-sm truncate">
                  Creepy Nuts「Bling-Bang-Bang-Born」
                </span>

                <div className="border p-3 rounded flex items-center gap-2">
                  <FileIcon className="w-4 h-4 text-blue-500" />
                  <span className="text-sm truncate">backup.pptx</span>
                </div>

                <div className="border p-3 rounded flex items-center gap-2">
                  <FileText className="w-4 h-4 text-green-600" />
                  <span className="text-sm truncate">blind injection.docx</span>
                </div>
              </div>

              {/* Submission info */}
              <div className="flex items-center gap-8 text-sm pt-2">
                <div>
                  <span className="text-xl font-semibold">0</span> <br /> Đã nộp
                </div>
                <div>
                  <span className="text-xl font-semibold">1</span> <br /> Đã
                  giao
                </div>
              </div>

              <div>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Xem hướng dẫn
                </a>
              </div>
            </CardContent>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>

    // <Accordion type="single" collapsible className="w-full">
    //   <AccordionItem value="item-1">
    //     <AccordionTrigger>
    //       <Card
    //         className="hover:bg-neutral-200 hover:cursor-pointer w-full"
    //         asChild
    //       >
    //         <CardHeader>
    //           <div className="flex items-center justify-between">
    //             <div>
    //               <CardTitle>Bài kiểm tra chương 2</CardTitle>
    //               <CardDescription className="mt-2">28 tháng 3</CardDescription>
    //             </div>
    //             {isTeacher && (
    //               <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                   <EllipsisVertical />
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent className="w-56">
    //                   <DropdownMenuItem onClick={() => setIsEditMenuOpen(true)}>
    //                     <Pencil className="mr-2 h-5 w-5" />
    //                     <span>Edit</span>
    //                   </DropdownMenuItem>
    //                   <DropdownMenuItem>
    //                     <ClipboardCheck className="mr-2 h-5 w-5" />
    //                     <span>Delete Assignment</span>
    //                   </DropdownMenuItem>
    //                 </DropdownMenuContent>
    //               </DropdownMenu>
    //             )}
    //           </div>
    //         </CardHeader>
    //       </Card>
    //     </AccordionTrigger>
    //     <AccordionContent>

    //     </AccordionContent>
    //   </AccordionItem>
    // </Accordion>
  );
  if (!data || Object.keys(data).length === 0) {
    return <div>Loading...</div>; // Hoặc anh thêm skeleton/loading spinner cũng được
  }

  return (
    <TabsContent value="assignments" className="w-4/5 mx-auto mt-5 pt-20">
      <div
        className={cn(
          'md:grid-cols-4 gap-4 mt-4 items-start',
          isStudent && 'grid'
        )}
      >
        {isStudent && (
          <div className="rounded-xl shadow-sm bg-white p-4 w-full max-w-xs border border-gray-200">
            <h2 className="text-base font-semibold text-gray-800 mb-3">
              Trạng thái
            </h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2 border-b pb-1 relative px-4 justify-between">
                <span className="h-2 w-2 rounded-full bg-red-500 absolute left-0"></span>
                <span>Sắp đến hạn</span>
                <span>3</span>
              </li>
              <li className="flex items-center gap-2 border-b pb-1 relative px-4 justify-between">
                <span className="h-2 w-2 rounded-full bg-orange-400 absolute left-0"></span>
                <span>Đã nộp muộn</span>
                <span>3</span>
              </li>
              <li className="flex items-center gap-2 relative px-4 justify-between">
                <span className="h-2 w-2 rounded-full bg-gray-400 absolute left-0"></span>
                <span>Chưa nộp</span>
                <span>0</span>
              </li>
            </ul>
          </div>
        )}
        {isTeacher && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="mb-5 rounded-4xl bg-blue-700 text-white ml-auto p-3 flex gap-2 shadow-2xl">
                <Plus></Plus>
                <span>New</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem
                onClick={() => {
                  setIsNewAssignmentOpen(true);
                }}
              >
                <ClipboardList className="mr-2 h-5 w-5" />
                <span>Bài tập</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ClipboardCheck className="mr-2 h-5 w-5" />
                <span>Bài kiểm tra</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-5 w-5" />
                <span>Câu hỏi</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BookMarked className="mr-2 h-5 w-5" />
                <span>Tài liệu</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Repeat className="mr-2 h-5 w-5" />
                <span>Sử dụng lại bài đăng</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FolderOpen className="mr-2 h-5 w-5" />
                <span>Chủ đề</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {/* Cột phải - Thông báo & Danh sách bài tập */}
        <div className="md:col-span-3 space-y-4">
          {/* Thông báo */}

          {/* Danh sách bài tập */}

          {isStudent ? (
            <Link to="/class/testId/AssignmentDetail">{Content}</Link>
          ) : (
            Content
          )}
        </div>
      </div>
    </TabsContent>
  );
}
