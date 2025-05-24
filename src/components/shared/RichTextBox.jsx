import { useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { Bold, Italic, Underline } from 'lucide-react';
import AttachAndUpload from './AttachAndUpload';
import { cn } from '@/lib/utils';

const RichTextBox = forwardRef(
  (
    {
      placeholder = 'Your content...',
      className = '',
      file,
      setFile,
      link,
      setLink,
    },
    ref
  ) => {
    const editorRef = useRef();
    const [focused, setFocused] = useState(false);
    const [hasContent, setHasContent] = useState(false);

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

    const handleInput = () => {
      setHasContent(editorRef.current.innerText.trim().length > 0);
    };

    useImperativeHandle(ref, () => ({
      focus: () => editorRef.current?.focus(),
      getHTML: () => editorRef.current?.innerHTML,
      clear: () => {
        editorRef.current.innerHTML = '';
        setHasContent(false);
      },
    }));

    const isFloating = focused || hasContent;

    return (
      <div className="w-full rounded pb-3 space-y-2 relative">
        <div className="relative">
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={cn(
              'min-h-[100px] w-full border rounded-md p-3 pt-5 pb-10 text-sm transition-all outline-none',
              focused ? 'border-blue-500' : 'border-gray-300',
              className
            )}
          ></div>
          <label
            className={cn(
              'absolute left-3 bg-white px-1 text-gray-500 transition-all duration-200 pointer-events-none',
              isFloating ? 'text-xs -top-2 text-blue-500' : 'text-sm top-3.5'
            )}
          >
            {placeholder}
          </label>
        </div>
        <div className="relative">
          <div className="flex gap-2 absolute -top-10 left-2">
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
          <AttachAndUpload
            file={file}
            setFile={setFile}
            link={link}
            setLink={setLink}
          />
        </div>
      </div>
    );
  }
);

export default RichTextBox;
