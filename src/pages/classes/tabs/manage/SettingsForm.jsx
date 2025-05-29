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
import api from '@/services/api';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';

export default function SettingsForm({ setIsSetting }) {
  const [isEdited, setIsEdited] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { classId } = useParams();
  const [input, setInput] = useState({
    class_code: '',
    class_name: '',
    status: '',
    max_students: '',
    note: '',
  });

  useEffect(() => {
    setIsLoading(true);
    api.get(`/classes/${classId}`)
      .then((response) => {
        const classData = response.data;
        setInput({
          class_code: classData.class_code || '',
          class_name: classData.class_name || '',
          status: classData.status || '',
          max_students: classData.max_students || '',
          note: classData.note || '',
        });
      }).catch((error) => {
        console.error('Error fetching class data:', error);
        toast.error('Failed to load class data. Please try again.');
      }).finally(() => {
        setIsLoading(false);
      })
  }, [])




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!isEdited) setIsEdited(true);
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value) => {
    // if (!isEdited && input !== initialInput) setIsEdited(true);
    setInput((prev) => ({ ...prev, status: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    api.patch(`/classes/${classId}`, input)
      .then((response) => {
        toast('Class updated successfully!');
        setIsSetting(false);
        setOpen(false);
      }).catch((error) => {
        console.error('Error updating class:', error);
        toast('Error updating class. Please try again.')
      })
  };

  const handleDiscard = () => {
    setOpen(false);
    setIsEdited(false);
    setIsSetting(false);
  };

  const handleCancel = () => {
    isEdited ? setOpen(true) : setIsSetting(false);
  };


  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        handleCancel();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleCancel]);
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
                  name="class_code"
                  value={input.class_code}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-1">
                <Label>Class Name</Label>
                <Input
                  name="class_name"
                  value={input.class_name}
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
              <div className="space-y-1">
                <Label>Max Students</Label>
                <Input
                  type="number"
                  name="max_students"
                  value={input.max_students}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>
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
