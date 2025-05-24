import { useRef, forwardRef, useImperativeHandle } from 'react';
import { Bold, Italic, Underline } from 'lucide-react';
import AttachAndUpload from './AttachAndUpload';

const RichTextBox = forwardRef(
  ({ placeholder, className = '', file, setFile, link, setLink }, ref) => {
    const editorRef = useRef();

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

    useImperativeHandle(ref, () => ({
      focus: () => editorRef.current?.focus(),
      getHTML: () => editorRef.current?.innerHTML,
      clear: () => (editorRef.current.innerHTML = ''),
    }));

    return (
      <div className="w-full rounded pb-3 space-y-2 relative">
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onKeyDown={handleKeyDown}
          className={`min-h-[100px] border border-gray-300 p-3 rounded focus:outline-none text-sm pb-10 ${className}`}
          data-placeholder={placeholder}
        ></div>

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
