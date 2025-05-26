// src/components/NewAssignmentForm.jsx
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "@/providers/authContext";
import api from "@/services/api";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import RichTextBox from "@/components/shared/RichTextBox";
import AvatarUser from "@/components/shared/AvatarUser";
import DateTimePicker from "@/components/shared/DateTimePicker";
import { toast } from "sonner";
import LinkPreview from "@/components/shared/LinkPreview";

export default function NewAssignmentForm({ isOpen, onClose, onCreated, students }) {
  const { classDetailId } = useParams();
  const { user } = useUserContext();
  const editorRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: new Date(),
    max_score: 100,
    links: [],
    files: [],
    students: [],
  });

  const [newLink, setNewLink] = useState("");

  // default to all students selected
  useEffect(() => {
    setForm(f => ({ ...f, students: students.map(s => s._id) }));
  }, [students]);

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
  };

  const handleAddLink = () => {
    if (newLink.trim()) {
      setForm(f => ({ ...f, links: [...f.links, newLink.trim()] }));
      setNewLink("");
    } else {
      toast("Please enter a valid link");
    }
  }


  const toggleStudent = (id) => {
    setForm(f => {
      const sel = f.students.includes(id)
        ? f.students.filter(s => s !== id)
        : [...f.students, id];
      return { ...f, students: sel };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      description: editorRef.current?.getHTML?.() || form.description,
      class: classDetailId,
      teacher: user._id,
      due_date: form.due_date,
      max_score: form.max_score,
      links: form.links.filter(l => l.trim()),
      students: form.students,
    };
    try {
      await api.post("/assignments", payload);
      onCreated();
      onClose();
      toast.success("Assignment created successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create assignment. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white px-6 py-4 shadow">
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
          <X />
        </button>
        <h2 className="text-xl font-semibold">Create New Assignment</h2>
        <Button form="assignment-form" type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </div>

      {/* Form */}
      <div
        id="assignment-form"
        className="max-w-3xl mx-auto p-6 space-y-6"
      >
        {/* Title */}
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={e => handleChange("title", e.target.value)}
            required
            className="mt-1"
          />
        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <RichTextBox
            ref={editorRef}
            initialValue={form.description}
            className="mt-1 min-h-[200px]"
          />
        </div>

        {/* Due Date & Max Score */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Due Date</Label>
            <DateTimePicker onChange={date => handleChange("due_date", date)} value={form.due_date} />
          </div>
          <div>
            <Label htmlFor="max_score">Max Score</Label>
            <Input
              id="max_score"
              type="number"
              min={0}
              value={form.max_score}
              onChange={e => handleChange("max_score", Number(e.target.value))}
              required
              className="mt-1"
            />
          </div>
        </div>

        {/* Links */}
        <div>
          <Label>Reference Links</Label>
          <div className="space-y-2 mt-4">
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
                    setForm(f => ({ ...f, links }));
                  }}><X /></Button>
              </div>
            ))}
            <div className="flex justify-between items-center gap-2">

              <Input
                placeholder="https://..."
                value={newLink}
                onChange={e => setNewLink(e.target.value)}
              />
              <Button onClick={handleAddLink}>Add Link</Button>
            </div>
          </div>
        </div>

        {/* Student Selection */}
        <div>
          <Label>Assign To</Label>
          <div className="grid grid-cols-2 gap-4 mt-2 max-h-48 overflow-y-auto">
            {students.map(s => (
              <div key={s._id} className="flex items-center gap-2">
                <Checkbox
                  id={`st-${s._id}`}
                  checked={form.students.includes(s._id)}
                  onCheckedChange={() => toggleStudent(s._id)}
                />
                <Label
                  htmlFor={`st-${s._id}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <AvatarUser user={s} className="w-6 h-6" />
                  {s.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
