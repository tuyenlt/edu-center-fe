import { useRef, useState } from 'react';
import { Label } from '@/components/ui/label';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Upload,
  LinkIcon,
  Bold,
  Italic,
  Underline,
  MoreVertical,
} from 'lucide-react';
export default function RichTextBox({ onCancel }) {
  const editorRef = useRef(null);
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'b') {
      e.preventDefault();
      document.execCommand('bold');
    }
    if (e.ctrlKey && e.key === 'i') {
      e.preventDefault();
      document.execCommand('italic');
    }
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
      document.execCommand('underline');
    }
  };

  const formatText = (command) => {
    document.execCommand(command);
    editorRef.current?.focus();
  };
  const [file, setFile] = useState([]);
  const fileRef = useRef(null);
  const linkRef = useRef(null);
  const [link, setLink] = useState([]);
  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === 'file') {
        const pastedFile = item.getAsFile();
        if (pastedFile) {
          setFile((prev) => [...prev, pastedFile]);
        }
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile((prev) => [...prev, selectedFile]);
    }
  };
  return (
    <div className="w-full rounded p-3 space-y-2">
      {/* Toolbar */}

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onKeyDown={handleKeyDown}
        className="min-h-[100px] bg-gray-100 border border-gray-300 p-3 rounded focus:outline-none text-sm pb-10"
        data-placeholder="Annouce something..."
      ></div>
      <div className="relative">
        <div className="flex gap-2 absolute bottom-3 left-2">
          <button
            onClick={() => formatText('bold')}
            className="p-1 hover:bg-gray-300 rounded"
          >
            <Bold className="w-5 h-5" />
          </button>

          <button
            onClick={() => formatText('italic')}
            className="p-1 hover:bg-gray-300 rounded"
          >
            <Italic className="w-5 h-5" />
          </button>

          <button
            onClick={() => formatText('underline')}
            className="p-1 hover:bg-gray-300 rounded"
          >
            <Underline className="w-5 h-5" />
          </button>
        </div>
      </div>
      {link.length > 0 &&
        link.map((url) => {
          return (
            <div className="flex items-center border rounded-lg px-4 py-3 w-full shadow-sm hover:shadow transition ">
              {/* Stripe bên trái (tuỳ chọn) */}
              <div className="w-1 h-12 bg-gray-200 rounded-l-md mr-4" />

              {/* Nội dung link */}
              <div className="flex-1 overflow-hidden">
                <div className="font-medium text-sm">Link</div>
                <a
                  href={url}
                  className="text-gray-600 text-sm truncate block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url}
                </a>
              </div>
              {/* Icon menu */}
              <div className="ml-2">
                <MoreVertical className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
              </div>
            </div>
          );
        })}
      {file.length > 0 &&
        file.map((f, index) => (
          <div
            key={index}
            className="flex items-center border rounded-lg px-4 py-3 w-full shadow-sm hover:shadow transition"
          >
            {/* Stripe bên trái */}
            <div className="w-1 h-12 bg-gray-200 rounded-l-md mr-4" />

            {/* Nội dung file */}
            <div className="flex-1 overflow-hidden">
              <div className="font-medium text-sm">File</div>
              <div className="text-gray-600 text-sm truncate block">
                {f.name} — <span className="italic text-xs">{f.type}</span>
              </div>
            </div>

            {/* Icon menu */}
            <div className="ml-2">
              <MoreVertical className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
            </div>
          </div>
        ))}

      <div className="flex gap-6 py-3 justify-between">
        <div className="flex gap-3 ">
          <Dialog>
            <DialogTrigger asChild>
              <div className="rounded-full p-2 border border-gray-300 hover:bg-gray-100">
                <Upload className="w-6 h-6" />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <div
                className="p-4 border border-dashed border-gray-400 rounded-lg text-center cursor-pointer"
                onClick={() => fileRef.current?.click()}
                onPaste={handlePaste}
              >
                <p className="text-gray-600">
                  Paste file here (Ctrl+V) or click to select
                </p>
              </div>

              <input
                type="file"
                ref={fileRef}
                onChange={handleFileChange}
                hidden
              />

              {file.length > 0 && (
                <div className="mt-4 space-y-2">
                  {file.map((f, i) => (
                    <div key={i} className="text-sm text-gray-700">
                      <p>Selected: {f.name}</p>
                      {f.type.startsWith('image/') && (
                        <img
                          src={URL.createObjectURL(f)}
                          alt="preview"
                          className="mt-2 max-h-48 mx-auto rounded-md"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <DialogFooter>
                <DialogClose asChild>
                  <Button>Submit file</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <button className="rounded-full p-2 border border-gray-300 hover:bg-gray-100">
                <LinkIcon className="w-5 h-5" />
              </button>
            </DialogTrigger>

            <DialogContent className="w-full max-w-sm">
              <DialogHeader>
                <DialogTitle>Add Link</DialogTitle>
              </DialogHeader>

              <form className="space-y-4 w-full">
                <Input
                  id="link"
                  placeholder="Enter link..."
                  type="url"
                  className="w-full"
                  ref={linkRef}
                />

                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      onClick={() => {
                        setLink((prev) => [...prev, linkRef.current.value]);
                      }}
                    >
                      Submit link
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-6 ">
          <button
            onClick={onCancel}
            className="hover:bg-blue-50 px-3 rounded-sm"
          >
            Cancel
          </button>
          <Button
            onClick={() => {
              console.log(editorRef.current.innerHTML);
              console.log(link);
              console.log(file);
            }}
            type="button"
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
