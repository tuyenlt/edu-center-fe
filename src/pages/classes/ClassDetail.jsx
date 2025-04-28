import { useParams, Link } from 'react-router-dom';
import AssignmentDetail from './AssignmentDetail';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
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
import { Checkbox } from '@/components/ui/checkbox';

import { cn } from '@/lib/utils';
import { UserRound, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function ClassDetail() {
  const { id } = useParams();
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
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
  const hasStudent = people.filter((person) => person.position === 'Student');

  return (
    <div className="flex ml-auto mr-auto justify-around relative text-black">
      <div className="w-2/3">
        <Card className="">
          <CardHeader className="text-sm">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">AI - N10</CardTitle>
              <p>3 Months</p>
            </div>
            <div className="flex items-center justify-between">
              <CardDescription className="text-xl">
                Lớp học trí tuệ nhân tạo cho sinh viên năm 3
              </CardDescription>
              <div className="flex gap-1 items-center">
                <UserRound className="w-4" />
                <p>25/25</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="stream" className="mt-4 ">
          <TabsList className="bg-white">
            {['stream', 'assignments', 'people'].map((value) => {
              return (
                <TabsTrigger
                  key={value}
                  value={value}
                  className={cn(
                    'p-6 rounded-lg text-sm font-medium relative bg-white hover:bg-gray-200 hover:cursor-pointer',
                    'data-[state=active]:text-blue-600',
                    'data-[state=active]:after:content-[""] data-[state=active]:after:absolute  data-[state=active]:after:-bottom-1 data-[state=active]:after:h-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0  data-[state=active]:after:bg-blue-600 data-[state=active]:after:rounded-t-md data-[state=active]:after:border-t-4 data-[state=active]:shadow-none data-[state=active]:hover:bg-blue-50',
                    'text-gray-700 '
                  )}
                >
                  {value === 'stream'
                    ? 'Bảng tin'
                    : value === 'assignments'
                    ? 'Bài tập'
                    : 'Mọi người'}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {/* Bảng tin */}
          <TabsContent value="stream">
            <TabsContent value="stream">
              <div className="flex gap-4 mt-4">
                {/* Nội dung chính bên trái */}
                <div className="flex-1 transition-all duration-300">
                  <Card>
                    <CardHeader>
                      <CardTitle>Thông báo</CardTitle>
                      <CardDescription>Nội dung bảng tin...</CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                {/* Accordion bên phải */}
              </div>
            </TabsContent>
          </TabsContent>

          {/* Tab bài tập trên lớp */}

          <TabsContent value="assignments">
            <div className="grid md:grid-cols-3 gap-4 mt-4 items-start">
              {/* Cột trái - Sắp đến hạn */}
              <Card>
                <CardHeader>
                  <CardTitle>Sắp đến hạn</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Tuyệt vời, không có bài tập nào sắp đến hạn!</p>
                </CardContent>
              </Card>

              {/* Cột phải - Thông báo & Danh sách bài tập */}
              <div className="md:col-span-2 space-y-4">
                {/* Thông báo */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src="/some-avatar.jpg" />
                        <AvatarFallback>HS</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardDescription>
                          Thông báo nội dung nào đó cho lớp học của bạn
                        </CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          ⋮
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                        <DropdownMenuItem>Xoá</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                </Card>

                {/* Danh sách bài tập */}
                <Card
                  className="hover:bg-neutral-200 hover:cursor-pointer "
                  asChild
                >
                  <Link to={'/class/testId/AssignmentDetail'}>
                    <CardHeader>
                      <CardTitle>Bài kiểm tra chương 2</CardTitle>
                      <CardDescription>28 tháng 3</CardDescription>
                    </CardHeader>
                  </Link>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Bài kiểm tra chương 1</CardTitle>
                    <CardDescription>28 tháng 2</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </TabsContent>
          {/* Tab thành viên */}

          <TabsContent value="people">
            <div className="flex justify-between items-center border border-neutral-200 border-t-0 border-x-0 pl-5 pr-5">
              <h2 className="text-3xl font-medium pt-5 pb-5 ">Teacher</h2>
              <span>2 teachers</span>
            </div>

            <ul className="mt-10">
              {people
                .filter((person) => person.position === 'Teacher')
                .map((person) => (
                  <li
                    key={person.id}
                    className="pb-3 pt-3 border pl-5 border border-neutral-200 border-t-0 border-x-0"
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
              <span>2 students</span>
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
        </Tabs>
      </div>
      {isAccordionOpen && (
        <div className="w-[300px] shrink-0 transition-all duration-300">
          <div className="flex border-b-2 pb-5 justify-between items-center">
            <p className="text-xl ">Các buổi học</p>
            <button
              className="text-3xl hover:cursor-pointer"
              onClick={() => setIsAccordionOpen(false)}
            >
              ×
            </button>
          </div>
          <Accordion type="multiple" className="w-full">
            {chapters.map((chapter) => (
              <AccordionItem
                key={chapter.id}
                value={`item-${chapter.id}`}
                className="hover:cursor-pointer"
              >
                <AccordionTrigger>
                  <div className="flex justify-between w-full">
                    <span>{chapter.title}</span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="ml-3">
                  {chapter.lessons ? (
                    <Accordion type="multiple" className="w-full">
                      {chapter.lessons.map((lesson) => (
                        <AccordionItem
                          key={lesson.id}
                          value={`item-lesson-${lesson.id}`}
                          className="hover:cursor-pointer"
                        >
                          <AccordionTrigger>
                            <div className="flex justify-between w-full">
                              <span>{lesson.title}</span>
                              <span className="text-sm text-muted-foreground">
                                {lesson.duration || ''}
                              </span>
                            </div>
                          </AccordionTrigger>

                          <AccordionContent className="ml-3">
                            <p>Nội dung chi tiết bài học</p>
                            {lesson.hasResources && (
                              <Button className="mt-2" variant="outline">
                                Tài liệu
                              </Button>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <p className="text-gray-500">Không có bài học nào.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
      {!isAccordionOpen && (
        <button
          className="hover:cursor-pointer w-10 bg-blue-300 absolute -right-6 top-0 rounded-l-2xl"
          onClick={() => setIsAccordionOpen(true)}
        >
          <ArrowLeft />
        </button>
      )}
    </div>
  );
}
