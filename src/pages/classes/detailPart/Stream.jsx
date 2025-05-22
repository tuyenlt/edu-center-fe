import { useRef, useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { Copy, Maximize, CheckCheck } from 'lucide-react';
import { useUserContext } from '@/providers/authContext';
import RichTextBox from '@/components/shared/RichTextBox';
import Comment from '../Comment';
export default function Stream({ data }) {
  const [file, setFile] = useState([]);
  const [link, setLink] = useState([]);
  const [isCopied, setisCopied] = useState(false);
  const [isRichTextOpen, setIsRichTextOpen] = useState(false);
  const editorRef = useRef(null);
  const handleCopyCode = () => {
    setisCopied(true);
    navigator.clipboard.writeText(class_code);
    setTimeout(() => setisCopied(false), 2000);
  };
  const { user } = useUserContext();
  const isTeacher = user?.role === 'teacher';
  if (!data) console.log(data);
  const class_name = data?.class_name;
  const class_code = data?.class_code;
  if (!data || Object.keys(data).length === 0) {
    return <div>Loading...</div>; // Hoặc anh thêm skeleton/loading spinner cũng được
  }

  return (
    <TabsContent value="stream" className="w-4/5 mx-auto mt-5 pt-20">
      {isCopied && (
        <Alert className="fixed z-1000 bottom-5 left-5 w-50">
          <CheckCheck className="h-4 w-4" />
          <AlertTitle>Copied!</AlertTitle>
        </Alert>
      )}
      <Card className="w-full h-[240px] p-0 relative gap-0 bg-[url(/images/img_reachout.jpg)] bg-cover">
        <CardHeader className="text-sm absolute w-full bottom-3 left-5 p-0">
          <CardTitle className="text-4xl text-white">{class_name}</CardTitle>
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
              <span>{class_code}</span>
              <Dialog>
                <DialogTrigger asChild>
                  <Maximize></Maximize>
                </DialogTrigger>
                <DialogContent className="sm:max-w-1/3">
                  <DialogHeader>
                    <DialogTitle>Class code</DialogTitle>
                  </DialogHeader>
                  <p className="text-9xl text-center text-zinc-700 py-6">
                    {class_code}
                  </p>
                  <div className="grid-cols-6 grid">
                    <p className="col-span-1">
                      {class_name.length <= 7
                        ? class_name
                        : `${class_name.slice(0, 7)}...`}
                    </p>
                    <p className="col-span-1 text-gray-400">Blank Info</p>
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
              {!isRichTextOpen && (
                <div className="flex items-center gap-4 ">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-[url(/images/avt1.webp)] bg-cover"></AvatarFallback>
                  </Avatar>
                  <button
                    className="text-sm text-gray-400"
                    onClick={() => setIsRichTextOpen(true)}
                  >
                    Announce something...
                  </button>
                </div>
              )}
              {isRichTextOpen && (
                <>
                  <RichTextBox
                    placeholder="Announce something..."
                    className="bg-gray-100 min-h-[200px]"
                    ref={editorRef}
                    file={file}
                    setFile={setFile}
                    link={link}
                    setLink={setLink}
                  />

                  <div className="flex gap-6 justify-end">
                    <button
                      onClick={() => setIsRichTextOpen(false)}
                      className="hover:bg-blue-50 px-3 rounded-sm"
                    >
                      Cancel
                    </button>
                    <Button
                      onClick={() => {
                        console.log(editorRef?.current?.getHTML());
                        console.log(link);
                        console.log(file);
                      }}
                      type="button"
                    >
                      Post
                    </Button>
                  </div>
                </>
              )}
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
  );
}
