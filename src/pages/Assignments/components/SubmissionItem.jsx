import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SubmissionItem({
    submission,
    maxScore,
    grade,
    onGradeChange,
    onSaveGrade,
}) {
    const { _id, student, text, urls } = submission;
    return (
        <div className="border p-4 rounded space-y-2">
            <p><strong>Student:</strong> {student.name}</p>
            <p><strong>Answer:</strong></p>
            <div className="prose border p-2">{text || <em>(no text)</em>}</div>
            {urls?.length > 0 && (
                <div>
                    <strong>URLs:</strong>
                    <ul className="list-disc list-inside">
                        {urls.map((u, i) => (
                            <li key={i}>
                                <a href={u} target="_blank" rel="noreferrer">{u}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* grading controls */}
            <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                    <Label htmlFor={`score-${_id}`}>Score</Label>
                    <Input
                        id={`score-${_id}`}
                        type="number"
                        min={0}
                        max={maxScore}
                        value={grade.score}
                        onChange={(e) =>
                            onGradeChange(_id, { ...grade, score: e.target.value })
                        }
                        className="mt-1"
                    />
                </div>
                <div>
                    <Label htmlFor={`fb-${_id}`}>Feedback</Label>
                    <Input
                        id={`fb-${_id}`}
                        value={grade.feedback}
                        onChange={(e) =>
                            onGradeChange(_id, { ...grade, feedback: e.target.value })
                        }
                        className="mt-1"
                    />
                </div>
            </div>
            <Button size="sm" onClick={() => onSaveGrade(_id)}>
                Save Grade
            </Button>
        </div>
    );
}
