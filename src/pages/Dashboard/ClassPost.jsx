import { Card } from '@/components/ui/card';
import { convertUTC, dateTimeConvert_2 } from '@/utils/dateTimeConvert';
import { NotepadText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function ClassPost({ post, user, class_name, class_code }) {
  const navigate = useNavigate();
  const isAssignment = post.type === 'assignment';
  const handleHeaderClick = () => {
    if (!isAssignment) return;
    navigate(`/assignments/${post.assignment}`);
  };
  return (
    <div className="px-4 py-3 border-t last:border-b">
      <div className="flex gap-3 items-start">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-semibold text-sm shrink-0">
          {class_code?.slice(0, 2).toUpperCase()}
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-1">
            <div className="font-semibold text-sm">{post.author?.name}</div>
            {isAssignment && (
              <div className="flex items-center gap-1 text-sm text-gray-800">
                <NotepadText className="w-4 h-4 text-blue-500" />
                <span className="font-medium">{post.title}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between text-xs text-gray-500">
            <div>{dateTimeConvert_2(post.createdAt)}</div>
            <div>
              {isAssignment && post.assignment?.due_date && (
                <span>Due: {dateTimeConvert_2(post.assignment.due_date)}</span>
              )}
            </div>
          </div>

          {!isAssignment && (
            <div
              className="text-sm text-gray-700 mt-1 line-clamp-2"
              dangerouslySetInnerHTML={{
                __html:
                  post.content?.length > 100
                    ? post.content.slice(0, 100) + '...'
                    : post.content,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
