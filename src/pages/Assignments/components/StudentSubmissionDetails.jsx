import LinkPreview from "@/components/shared/LinkPreview";

export default function StudentSubmissionDetails({ submission }) {
    const { submitted_at, text, links, score, feedback } = submission;
    console.log("StudentSubmissionDetails", submission);
    return (
        <div className="space-y-4 mb-8">
            <div>
                <strong>Submitted on:</strong>{" "}
                {new Date(submitted_at).toLocaleString()}
            </div>
            <div>
                <strong>Your answer:</strong>
                <div className="prose border p-2">{text}</div>
            </div>
            {links?.length > 0 && (
                <div>
                    <strong>URLs:</strong>
                    <ul className="list-disc list-inside">
                        {links.map((u, i) => (
                            <LinkPreview url={u} key={i} className="w-full mb-2" />
                        ))}
                    </ul>
                </div>
            )}
            <div>
                <strong>Your score:</strong> {score ?? "Not graded yet"}
            </div>
            <div>
                <strong>Feedback:</strong> {feedback || "—"}
            </div>
        </div>
    );
}
