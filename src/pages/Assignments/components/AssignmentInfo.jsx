import AvatarUser from "@/components/shared/AvatarUser";
import LinkPreview from "@/components/shared/LinkPreview";
import { dateTimeConvert_2 } from "@/utils/dateTimeConvert";


export default function AssignmentInfo({ assignment }) {
    return (
        <section className="mb-8 flex flex-col">
            <h1 className="text-2xl font-bold mb-4">{assignment.title}</h1>
            <div className="flex">
                <AvatarUser user={assignment.teacher} className="w-14 h-14" />
                <div className="">
                    <span className="ml-2 text-lg font-bold flex">
                        {assignment.teacher.name}
                    </span>
                    <div className="flex gap-2 ml-2">
                        <div>{new Date(assignment.createdAt).toLocaleDateString()}</div>
                        <div>·</div>
                        <div>{assignment.class.class_name}</div>
                    </div>
                </div>
            </div>
            <p className="flex gap-2 mt-4">
                <div>Max score:</div>
                <div className="">{assignment.max_score}</div>
            </p>
            <p className="mt-2 flex gap-2">
                <div>Due:</div>
                <div className="">{dateTimeConvert_2(assignment.due_date)}</div>
            </p>
            <div className="border mt-4"></div>
            <div
                className="prose mt-4 mb-4"
                dangerouslySetInnerHTML={{ __html: assignment.description }}
            />
            {assignment.links?.length > 0 && (
                assignment.links.map((link, idx) => (
                    <LinkPreview url={link} key={idx} className="w-full" />
                ))
            )}
            <div className="border mt-8 mb-8"></div>
        </section>
    );
}
