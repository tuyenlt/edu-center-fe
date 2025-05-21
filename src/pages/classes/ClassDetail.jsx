import { useParams, Link } from 'react-router-dom';
import { LayoutContext, useLayoutContext } from '@/providers/LayoutProvider';
import AssignmentDetail from './AssignmentDetail';
import AddPeopleToClass from './AddPeopleToClass';
import Comment from './Comment';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { cn } from '@/lib/utils';
import {
  UserRound,
  ArrowLeft,
  Maximize,
  Copy,
  CheckCheck,
  Plus,
  ClipboardList,
  ClipboardCheck,
  HelpCircle,
  BookMarked,
  Repeat,
  FolderOpen,
  UserRoundPlus,
  Settings,
  SendHorizonal,
  EllipsisVertical,
  Pencil,
  Youtube,
  LinkIcon,
  FileText,
  FileIcon,
} from 'lucide-react';
import { useContext, useState } from 'react';
import { useUserContext } from '@/providers/authContext';
import { set } from 'date-fns';
import NewAssignmentForm from './NewAssignmentForm';
import SettingsForm from './SettingsForm';
import { Textarea } from '@/components/ui/textarea';
import RichTextBox from '@/components/shared/RichTextBox';
export default function ClassDetail({}) {
  const { user } = useUserContext();
  const isStudent = user?.role === 'student';
  const isTeacher = user?.role === 'teacher';
  const isManager = user?.role === 'manager';
  const { id } = useParams();
  const [isCopied, setisCopied] = useState(false);

  const chapters = [
    {
      id: 0,
      title: 'Chapter 0: Lets getting started!',
      lessons: [{ id: 1, title: 'Lesson 0: Introduce' }],
    },
    {
      id: 1,
      title: 'Chapter 1: General Business',
      lessons: [
        { id: 1, title: 'Lesson 1: Contracts' },
        { id: 2, title: 'Lesson 2: Marketing' },
        {
          id: 3,
          title: 'Lesson 3: Warranty',
          hasResources: true,
        },
      ],
    },
    {
      id: 2,
      title: 'Chapter 2: Officer Issues',
      hasResources: true,
      lessons: [
        { id: 1, title: 'Lesson 1: Computers' },
        { id: 2, title: 'Lesson 2: Officer Technology' },
        {
          id: 3,
          title: 'Lesson 3: Office Procedures',
          hasResources: true,
        },
      ],
    },
  ];
  const people = [
    { id: 1, position: 'Teacher', name: 'Cristopher Nolan' },
    { id: 2, position: 'Teacher', name: 'Leonardo Dicarpio' },
    { id: 1, position: 'Student', name: 'Brad Pitt' },
    { id: 2, position: 'Student', name: 'Cristian Bale' },
  ];
  const students = [
    {
      name: 'Alan Weber',
      avatar: '🧑‍🦰',
      scores: [24, 95, 95, 25, 19],
    },
    {
      name: 'Alex Gonzalez',
      avatar: '🧕',
      scores: [25, null, 79, 'Missing', 22],
    },
    {
      name: 'Caesar Sabir',
      avatar: '👦',
      scores: [23, 92, 83, 24, 25],
    },
    {
      name: 'Clay Weaver-Bagnall',
      avatar: '🧑🏿‍🦱',
      scores: [25, 100, 84, 25, 18],
    },
    {
      name: 'Dayana Dougall',
      avatar: '👩‍🦱',
      scores: [22, 95, 92, 23, 24],
    },
    {
      name: 'Jamie Roncero',
      avatar: '🧑‍🦳',
      scores: [24, 90, 100, 22, 23],
    },
    {
      name: 'Alan Weber',
      avatar: '🧑‍🦰',
      scores: [24, 95, 95, 25, 19],
    },
    {
      name: 'Alex Gonzalez',
      avatar: '🧕',
      scores: [25, null, 79, 'Missing', 22],
    },
    {
      name: 'Caesar Sabir',
      avatar: '👦',
      scores: [23, 92, 83, 24, 25],
    },
    {
      name: 'Clay Weaver-Bagnall',
      avatar: '🧑🏿‍🦱',
      scores: [25, 100, 84, 25, 18],
    },
    {
      name: 'Dayana Dougall',
      avatar: '👩‍🦱',
      scores: [22, 95, 92, 23, 24],
    },
    {
      name: 'Jamie Roncero',
      avatar: '🧑‍🦳',
      scores: [24, 90, 100, 22, 23],
    },
    {
      name: 'Alan Weber',
      avatar: '🧑‍🦰',
      scores: [24, 95, 95, 25, 19],
    },
    {
      name: 'Alex Gonzalez',
      avatar: '🧕',
      scores: [25, null, 79, 'Missing', 22],
    },
    {
      name: 'Caesar Sabir',
      avatar: '👦',
      scores: [23, 92, 83, 24, 25],
    },
    {
      name: 'Clay Weaver-Bagnall',
      avatar: '🧑🏿‍🦱',
      scores: [25, 100, 84, 25, 18],
    },
    {
      name: 'Dayana Dougall',
      avatar: '👩‍🦱',
      scores: [22, 95, 92, 23, 24],
    },
    {
      name: 'Jamie Roncero',
      avatar: '🧑‍🦳',
      scores: [24, 90, 100, 22, 23],
    },
  ];

  const headers = [
    {
      date: 'Apr 13',
      title: 'Creative process',
      type: 'Homework out of 25',
    },
    {
      date: 'Apr 16',
      title: 'Screenplay',
      type: 'Writing Projects out of 100',
    },
    {
      date: 'Apr 15',
      title: 'Group project',
      type: 'Writing Projects out of 100',
    },
    {
      date: 'Apr 7',
      title: 'In-class writing',
      type: 'In-class work out of 25',
    },
    {
      date: 'Apr 16',
      title: 'Screenplay',
      type: 'Homework out of 25',
    },
  ];
  const subjects = {
    stream: 'Bảng tin',
    assignments: 'Bài tập',
    people: 'Mọi người',
    period: 'Period',
    ...(isTeacher && { grade: 'Grades' }),
  };

  const hasStudent = people.filter((person) => person.position === 'Student');
  const activeClass =
    'data-[state=active]:text-blue-600 data-[state=active]:hover:bg-blue-50 ' +
    'data-[state=active]:after:content-[""] data-[state=active]:after:absolute ' +
    'data-[state=active]:after:-bottom-[1px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 ' +
    'data-[state=active]:after:h-0 data-[state=active]:after:border-t-4 data-[state=active]:after:bg-blue-600 ' +
    'data-[state=active]:after:rounded-t-md';
  const handleCopyCode = () => {
    setisCopied(true);
    navigator.clipboard.writeText('tuyendz');
    setTimeout(() => setisCopied(false), 2000); // Tắt sau 2 giây
  };
  const [isNewAssignmentOpen, setIsNewAssignmentOpen] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const [isRichTextOpen, setIsRichTextOpen] = useState(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
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
                  <CardDescription className="mt-2">28 tháng 3</CardDescription>
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
                <a
                  href="https://chatgpt.com/c/682939"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border p-3 rounded hover:bg-gray-50 flex items-center gap-2"
                >
                  <LinkIcon className="w-4 h-4" />
                  <span className="text-sm truncate">Just a moment...</span>
                </a>

                <a
                  href="https://youtube.com/..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border p-3 rounded hover:bg-gray-50 flex items-center gap-2"
                >
                  <Youtube className="w-4 h-4 text-red-500" />
                  <span className="text-sm truncate">
                    Creepy Nuts「Bling-Bang-Bang-Born」
                  </span>
                </a>

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
  const handleCloseSettings = () => {
    setIsSetting(false);
  };

  const handleOpenSettings = () => {
    setIsSetting(true);
  };

  return isNewAssignmentOpen ? (
    <NewAssignmentForm onClose={() => setIsNewAssignmentOpen(false)} />
  ) : isSetting ? (
    <SettingsForm onClose={handleCloseSettings} />
  ) : (
    <Tabs defaultValue="stream" className="">
      {isCopied && (
        <Alert className="fixed z-1000 bottom-5 left-5 w-50">
          <CheckCheck className="h-4 w-4" />
          <AlertTitle>Copied!</AlertTitle>
        </Alert>
      )}
      <div className="border-b fixed z-10 bg-white flex items-center justify-between w-[calc(100vw-85px)] ">
        <TabsList className="bg-inherit ml-5 h-full flex items-center p-0">
          {Object.entries(subjects).map(([key, value]) => (
            <TabsTrigger
              key={key}
              value={key}
              className={cn(
                'px-6 py-4 text-base font-medium relative text-gray-700 rounded-none hover:bg-gray-200 cursor-pointer',
                activeClass
              )}
            >
              {value}
            </TabsTrigger>
          ))}
        </TabsList>
        <Settings className="w-5 h-5 mr-5" onClick={handleOpenSettings} />
      </div>

      <div className="h-screen bg-white">
        <TabsContent value="stream" className="w-4/5 mx-auto mt-5 pt-20">
          <Card className="w-full h-[240px] p-0 relative gap-0 bg-[url(/images/img_reachout.jpg)] bg-cover">
            <CardHeader className="text-sm absolute w-full bottom-3 left-5 p-0">
              <CardTitle className="text-4xl text-white">TOEIC BS</CardTitle>
            </CardHeader>
          </Card>

          <div
            className={cn(
              'grid-cols-5 items-start gap-x-6 mt-4 ',
              isTeacher && 'grid '
            )}
          >
            {isTeacher && (
              <Card className="gap-0 col-span-1">
                <CardHeader>
                  <div>
                    <CardTitle>Class code</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-xl font-semibold text-blue-600 flex items-center justify-between">
                  <span>ab123c</span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Maximize></Maximize>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-1/3">
                      <DialogHeader>
                        <DialogTitle>Class code</DialogTitle>
                      </DialogHeader>
                      <p className="text-9xl text-center text-zinc-700 py-6">
                        ab123c
                      </p>
                      <div className="grid-cols-6 grid">
                        <p className="col-span-1 ">TOEIC BS</p>
                        <p className="col-span-1 text-gray-400">Section 2</p>
                        <button
                          onClick={handleCopyCode}
                          className="col-start-6 ml-auto flex gap-2"
                        >
                          <Copy></Copy>
                          <p className="ml-auto">Copy</p>
                        </button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            )}
            <div className="flex flex-col flex-1 gap-y-7 col-span-4">
              <Card className="gap-0 shadow-lg">
                <CardContent>
                  <div className="flex items-center gap-4 ">
                    {!isRichTextOpen && (
                      <>
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-[url(/images/avt1.webp)] bg-cover"></AvatarFallback>
                        </Avatar>
                        <button
                          className="text-sm text-gray-400"
                          onClick={() => setIsRichTextOpen(true)}
                        >
                          Announce something...
                        </button>
                      </>
                    )}

                    {isRichTextOpen && (
                      <RichTextBox onCancel={() => setIsRichTextOpen(false)} />
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card className="gap-0 pb-0">
                <CardHeader>
                  <div className="flex items-center gap-4 ">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-[url(/images/avt1.webp)] bg-cover"></AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Duc Duong</CardTitle>
                      <CardDescription className="text-xs mt-1">
                        9 thg 5
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-sm border-b pb-3">
                  <p>Bài tập về nhà buổi 1</p>
                  <p>Làm xong sớm mai tao gọi lên trả lời</p>
                </CardContent>
                <CardFooter className="py-5 gap-x-3">
                  <Avatar className="w-10 h-10 p-1 bg-[rgba(60,64,67,.08)] rounded-full border-gray-200 dark:border-gray-700 cursor-pointer circle">
                    {user?.avatar_url ? (
                      <AvatarImage
                        className="rounded-full"
                        src={user.avatar_url}
                        alt={user.name}
                      />
                    ) : (
                      <AvatarFallback>{user?.name?.[0] || 'A'}</AvatarFallback>
                    )}
                  </Avatar>
                  <Comment></Comment>
                </CardFooter>
              </Card>
              <Card className="gap-0">
                <CardHeader>
                  <div className="flex items-center gap-4 ">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-[url(/images/avt1.webp)] bg-cover"></AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Duc Duong</CardTitle>
                      <CardDescription className="text-xs mt-1">
                        8 thg 5
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-sm ">
                  <p>Điền form đi các em</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
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
        {/* Tab thành viên */}

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
        {isTeacher && (
          <TabsContent value="grade" className="mx-auto mt-[57px]">
            <div className="w-full overflow-auto min-h-screen bg-white">
              <Table className="w-full table-fixed border-collapse text-sm">
                <TableHeader>
                  <TableRow>
                    {/* Cột đầu tiên: Học sinh */}
                    <TableHead className="border-t-0 border-l-0  text-left text-xs text-gray-500 w-48">
                      Sort by first name
                    </TableHead>

                    {/* Các cột điểm */}
                    {headers.map((h, idx) => (
                      <TableHead
                        key={idx}
                        className={cn(
                          'text-left align-top border border-gray-300 px-2 py-1',
                          idx === 0 && 'border-l-0',
                          idx === headers.length - 1 && 'border-r-0',
                          'border-t-0'
                        )}
                      >
                        <div className="text-xs text-gray-500">{h.date}</div>
                        <div className="text-purple-700 font-medium">
                          {h.title}
                        </div>
                        <div className="text-gray-400 text-xs">{h.type}</div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {students.map((student, i) => (
                    <TableRow key={i}>
                      {/* Cột tên học sinh */}
                      <TableCell
                        className={cn(
                          'border border-gray-300 text-sm font-medium py-2',
                          'border-l-0',
                          i === students.length - 1 && 'border-b-0'
                        )}
                      >
                        {student.name}
                      </TableCell>

                      {/* Các điểm */}
                      {student.scores.map((score, j) => (
                        <TableCell
                          key={j}
                          className={cn(
                            'border border-gray-300 text-sm py-2 px-2',
                            j === 0 && 'border-l-0',
                            j === headers.length - 1 && 'border-r-0',
                            i === students.length - 1 && 'border-b-0',
                            score === 'Missing'
                              ? 'text-red-500'
                              : 'text-gray-800'
                          )}
                        >
                          {score ?? '—'}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        )}
        <TabsContent value="period" className="w-4/5 mx-auto mt-5 pt-20">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Các buổi học
              </h2>
            </div>

            {/* Accordion Chapters */}
            <Accordion type="multiple" className="w-full space-y-3">
              {chapters.map((chapter) => (
                <AccordionItem
                  key={chapter.id}
                  value={`item-${chapter.id}`}
                  className="border rounded-lg shadow-sm bg-white"
                >
                  <AccordionTrigger className="px-4 py-3 hover:bg-gray-100 rounded-t-lg font-medium text-gray-800">
                    <div className="w-full flex justify-between items-center">
                      <span>{chapter.title}</span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-4 pb-4">
                    {chapter.lessons ? (
                      <Accordion type="multiple" className="space-y-2">
                        {chapter.lessons.map((lesson) => (
                          <AccordionItem
                            key={lesson.id}
                            value={`item-lesson-${lesson.id}`}
                            className="border rounded-md"
                          >
                            <AccordionTrigger className="px-3 py-2 hover:bg-gray-50 text-gray-700 font-medium">
                              <div className="w-full flex justify-between items-center">
                                <span>{lesson.title}</span>
                                <span className="text-sm text-muted-foreground">
                                  {lesson.duration || ''}
                                </span>
                              </div>
                            </AccordionTrigger>

                            <AccordionContent className="px-4 py-2 text-sm text-gray-600">
                              <p>Nội dung chi tiết bài học</p>
                              {lesson.hasResources && (
                                <Button variant="outline" className="mt-3">
                                  Tài liệu
                                </Button>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <p className="text-sm text-gray-500 px-3">
                        Không có bài học nào.
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
