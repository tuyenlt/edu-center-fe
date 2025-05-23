import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, X } from 'lucide-react';
import { useLayoutContext } from '@/providers/LayoutProvider';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function SettingsForm({ setIsSetting, data }) {
  const { setIsRootLayoutHidden } = useLayoutContext();
  const [isEditted, setIsEditted] = useState(false);
  const [open, setOpen] = useState(false);
  const initialInput = {
    code: data.class_code,
    name: data.class_name,
    status: data.status,
    max: data.max_students,
    note: data.note,
  };

  const [input, setInput] = useState({
    code: '',
    name: '',
    status: '',
    max: '',
    note: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!isEditted && input !== initialInput) setIsEditted(true);
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value) => {
    // if (!isEditted && input !== initialInput) setIsEditted(true);
    setInput((prev) => ({ ...prev, status: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log(input);
    setIsEditted(false);
    setIsSetting(false);
  };

  const handleDiscard = () => {
    setInput(initialInput);
    setOpen(false);
    setIsEditted(false);
    setIsSetting(false);
  };

  const handleCancel = () => {
    isEditted ? setOpen(true) : setIsSetting(false);
  };

  useEffect(() => {
    if (data) {
      setInput(initialInput);
    }
  }, [data]);
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        handleCancel();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleCancel]);
  console.log(data.status);
  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-auto">
      <div className="max-w-4xl mx-auto flex flex-col gap-6 p-6 pt-24">
        <div className="fixed top-0 left-0 w-full bg-white z-50 border-b px-6 h-16 flex items-center justify-between">
          <button onClick={handleCancel} type="button">
            <X />
          </button>
          <Button type="submit" form="setting-form">
            Save
          </Button>
        </div>

        <form id="setting-form" className="space-y-4" onSubmit={handleSave}>
          <Card>
            <CardContent className="space-y-4 p-6">
              <h2 className="text-xl font-semibold">
                Class Detail Information
              </h2>

              <div className="space-y-1">
                <Label>Class Code</Label>
                <Input
                  name="code"
                  value={input.code}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-1">
                <Label>Class Name</Label>
                <Input
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-1">
                <Label>Note</Label>
                <Input
                  name="note"
                  value={input.note}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-1">
                <Label>Status</Label>
                <Select value={input.status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="scheduling">Scheduling</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="finished">Finished</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {Object.keys(data).length > 0 &&
                console.log(input.class_code, input.status)}
              <div className="space-y-1">
                <Label>Max Students</Label>
                <Input
                  type="number"
                  name="max"
                  value={input.max}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>
          <div>// Coming soon...</div>
        </form>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[300px]">
            <DialogHeader>
              <DialogTitle>Discard changes?</DialogTitle>
              <DialogDescription>Your progress is not saved.</DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-4 mt-5">
              <Button onClick={handleDiscard}>Discard Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
