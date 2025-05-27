// src/components/AssignmentDetail/SubmissionItem.jsx
import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import AvatarUser from "@/components/shared/AvatarUser";
import LinkPreview from "@/components/shared/LinkPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { dateTimeConvert_2 } from "@/utils/dateTimeConvert";

export default function SubmissionItem({
    submission,
    maxScore,
    grade,
    onGradeChange,
    onSaveGrade,
}) {
    const { _id, student, text, links, createdAt, score } = submission;

    return (
        <Accordion type="single" collapsible className="w-full bg-white border rounded-md">
            <AccordionItem value={_id}>
                {/* Accordion header: always visible */}
                <AccordionTrigger className="flex items-center justify-between p-4 rounded cursor-pointer">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex">
                            <AvatarUser user={student} className="inline-block mr-2" />
                            <div className="flex flex-col">
                                <span className="font-semibold">{student.name}</span>
                                <span className="text-sm text-gray-500">
                                    {dateTimeConvert_2(createdAt)}
                                </span>
                            </div>
                        </div>
                        {score === undefined ? (
                            <span className="ml-2 text-yellow-500">Not graded</span>
                        ) : (
                            <span className="ml-2 text-green-500">
                                Score: {score} / {maxScore}
                            </span>
                        )}
                    </div>
                </AccordionTrigger>

                {/* Accordion content: expands on click */}
                <AccordionContent className="p-4 space-y-4">
                    <div>
                        <div className="font-medium">Answer:</div>
                        <div className="prose border p-2 rounded">
                            {text || <em>(no text)</em>}
                        </div>
                    </div>

                    {links?.length > 0 && (
                        <div>
                            <div className="font-medium">Links:</div>
                            <div className="space-y-2">
                                {links.map((url, i) => (
                                    <LinkPreview url={url} key={i} className="w-full" />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Grading controls */}
                    <div className="grid grid-cols-2 gap-4">
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
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
