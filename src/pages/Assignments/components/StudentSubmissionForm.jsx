// src/components/AssignmentDetail/StudentSubmissionForm.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextBox from "@/components/shared/RichTextBox";
import LinkPreview from "@/components/shared/LinkPreview";
import { X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function StudentSubmissionForm({
    form,
    onFormChange,
    onSubmit,
}) {
    const [newLink, setNewLink] = React.useState("");

    const changeField = (field, value) =>
        onFormChange({ ...form, [field]: value });

    return (
        <form onSubmit={onSubmit} className="space-y-4 w-full mb-8 flex flex-col items-center">
            <div className="w-full">
                <Label>Answer Text</Label>
                <Textarea type="text-area" className="w-full h-50 mt-2" value={form.text} onChange={(e) => changeField("text", e.target.value)} />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <Label>URLs (optional)</Label>
                {form.links.map((link, idx) => (
                    <div className="flex ml-2 items-center gap-3" key={idx} >
                        <LinkPreview url={link} className="!w-154" />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="p-1 hover:bg-gray-100 rounded"
                            onClick={() => {
                                const links = [...form.links];
                                links.splice(idx, 1);
                                changeField("links", links);
                            }}><X /></Button>
                    </div>
                ))}
                <div className="flex justify-between items-center gap-2">

                    <Input
                        placeholder="https://..."
                        value={newLink}
                        onChange={e => setNewLink(e.target.value)}
                    />
                    <Button onClick={() => changeField("links", [...form.links, newLink])}>Add Link</Button>
                </div>
            </div>
            <Button type="submit">Submit Assignment</Button>
        </form>
    );
}
