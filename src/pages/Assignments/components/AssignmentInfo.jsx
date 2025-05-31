import AvatarUser from '@/components/shared/AvatarUser';
import LinkPreview from '@/components/shared/LinkPreview';
import { dateTimeConvert_2 } from '@/utils/dateTimeConvert';
import { Separator } from '@/components/ui/separator';

export default function AssignmentInfo({ assignment }) {
  return (
    <section className="mb-10 px-6 py-4 bg-white rounded-2xl shadow-sm border space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-900">
        {assignment.title}
      </h1>

      {/* Teacher info */}
      <div className="flex items-center gap-4">
        <AvatarUser user={assignment.teacher} className="w-14 h-14" />
        <div>
          <p className="text-lg font-semibold text-gray-800">
            {assignment.teacher.name}
          </p>
          <div className="text-sm text-muted-foreground flex gap-2">
            <span>{new Date(assignment.createdAt).toLocaleDateString()}</span>
            <span>·</span>
            <span>{assignment.class.class_name}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Score and due date */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Max score</p>
          <p className="text-base font-medium text-gray-900">
            {assignment.max_score}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Due date</p>
          <p className="text-base font-medium text-gray-900">
            {dateTimeConvert_2(assignment.due_date)}
          </p>
        </div>
      </div>

      <Separator />

      {/* Description */}
      <div
        className="prose max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: assignment.description }}
      />

      {/* Links */}
      {assignment.links?.length > 0 && (
        <div className="space-y-4">
          {assignment.links.map((link, idx) => (
            <LinkPreview url={link} key={idx} className="w-full" />
          ))}
        </div>
      )}
    </section>
  );
}
