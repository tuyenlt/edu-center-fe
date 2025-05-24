import React, { useRef, useState, useEffect } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
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
import { cn } from '@/lib/utils';
import { Copy, Maximize, CheckCheck } from 'lucide-react';
import { useUserContext } from '@/providers/authContext';
import RichTextBox from '@/components/shared/RichTextBox';
import Comment from '../Comment';
import AvatarUser from '@/components/shared/AvatarUser';
import { io } from 'socket.io-client';
import { convertUTC } from '@/utils/dateTimeConvert';
import LinkPreview from '@/components/shared/LinkPreview';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function Stream({ data }) {
  const { user, token } = useUserContext();
  const isTeacher = user?.role === 'teacher';

  const [socket, setSocket] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isRichTextOpen, setIsRichTextOpen] = useState(false);
  const [title, setTitle] = useState(''); // ← title!
  const [file, setFile] = useState([]);
  const [link, setLink] = useState([]);
  const editorRef = useRef(null);

  useEffect(() => {
    if (!token) return;
    const s = io(API_URL, { auth: { accessToken: token } });

    s.on('connect', () => {
      s.emit('initClassUpdate', data._id);
    });

    s.on('classPostCreate', (newPost) => {
      setPosts((prev) => [newPost, ...prev]);
    });

    s.on('classPostComment', (comment) => {
      setPosts((prev) =>
        prev.map((post) =>
          post._id === comment.postId
            ? { ...post, comments: [...post.comments, comment] }
            : post
        )
      );
    });

    setSocket(s);
    return () => void s.disconnect();
  }, [data._id, token]);

  useEffect(() => {
    if (Array.isArray(data?.class_posts)) {
      setPosts(
        data.class_posts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    }
  }, [data.class_posts]);

  const handleCopyCode = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(data.class_code);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const class_name = data?.class_name;
  const class_code = data?.class_code;
  const addPostHandler = () => {
    socket.emit('classPostCreate', {
      classId: data._id,
      title,
      content: editorRef.current.getHTML(),
      author: user._id,
      type: 'announcement',
      attachments: file,
      links: link,
    });

    setTitle('');
    editorRef.current.clear();
    setFile([]);
    setLink([]);
    setIsRichTextOpen(false);
  };

  const handleAddComment = (postId, commentText) => {
    socket.emit('classPostComment', {
      classId: data._id,
      classPostId: postId,
      comment: {
        postId,
        content: commentText,
        author: user._id,
      },
    });
  };

  if (!data || data.length == 0) return <div>Loading…</div>;

  return (
    <TabsContent value="stream" className="w-4/5 mx-auto mt-5 pt-20">
      {isCopied && (
        <div className="fixed bottom-5 left-5 bg-white p-2 shadow rounded flex items-center gap-2">
          <CheckCheck className="h-4 w-4 text-green-600" />
          <span>Copied!</span>
        </div>
      )}

      {/* Hero banner */}
      <Card
        className="w-full h-60 bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${data.course.img_url})` }}
      >
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <CardHeader className="absolute bottom-4 left-6 text-white">
          <CardTitle className="text-4xl">{data.class_name}</CardTitle>
        </CardHeader>
      </Card>

      <div
        className={cn(
          'mt-6 grid gap-6',
          isTeacher ? 'grid-cols-5' : 'grid-cols-1'
        )}
      >
        {isTeacher && (
          <Card className="h-34">
            <CardHeader>
              <CardTitle>Class Code</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between text-xl text-blue-600">
              <span>{data.class_code}</span>
              <Dialog>
                <DialogTrigger asChild>
                  <Maximize className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Class Code</DialogTitle>
                  </DialogHeader>
                  <p className="text-center text-6xl py-6">{data.class_code}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {data.class_name.length <= 10
                        ? data.class_name
                        : `${data.class_name.slice(0, 10)}...`}
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center gap-2"
                    >
                      <Copy /> Copy
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}

        <div className="col-span-4 flex flex-col gap-6">
          {/* New announcement */}
          {isTeacher && (
            <Card className="shadow">
              <CardContent>
                {!isRichTextOpen ? (
                  <div className="flex items-center gap-4">
                    <AvatarUser user={user} className="w-12 h-12" />
                    <button
                      onClick={() => setIsRichTextOpen(true)}
                      className="text-gray-500"
                    >
                      Create announcement...
                    </button>
                  </div>
                ) : (
                  <>
                    <Input
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mb-2"
                    />
                    <RichTextBox
                      ref={editorRef}
                      placeholder="Content..."
                      className="bg-gray-100 min-h-[200px]"
                      file={file}
                      setFile={setFile}
                      link={link}
                      setLink={setLink}
                    />
                    <div className="mt-4 flex justify-end gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsRichTextOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={addPostHandler}>Post</Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Announcements list */}
          {posts.map((post) => (
            <Card key={post._id}>
              <CardHeader className="flex items-center gap-4">
                <AvatarUser user={post.author} className="w-12 h-12" />
                <div>
                  <CardTitle>
                    {post.author.name} Announce {post.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-500 m-1">
                    {convertUTC(post.createdAt)}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="text-gray-800 ml-2">
                <div
                  className=""
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                {post.links?.map((link, index) => (
                  <LinkPreview url={link} key={index} className="mt-2" />
                ))}
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                {post.comments.map((c) => (
                  <div key={c._id} className="flex items-start gap-3 w-full">
                    <AvatarUser user={c.author} className="w-8 h-8" />
                    <div>
                      <p className="text-sm font-medium">{c.author.name}</p>
                      <p className="text-sm text-gray-600">{c.content}</p>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-3 w-full">
                  <AvatarUser user={user} className="w-8 h-8" />
                  <Comment postId={post._id} onSubmit={handleAddComment} />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </TabsContent>
  );
}
